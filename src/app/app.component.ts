import { Component, OnInit } from "@angular/core";
import { TasksService } from "../services/tasks.service";
import { Task } from "../models/task.model";
import { Observable } from "../../node_modules/rxjs";
import {
  trigger,
  style,
  animate,
  transition
} from "@angular/animations";
import { NgxSpinnerService } from "ngx-spinner";
import { filterChangeTypes } from '../app.constants';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("visibility", [
      transition(":enter", [
        style({
          transform: "translateY(5%)",
          opacity: 0
        }),
        animate("0.25s ease-in")
      ]),
      transition(":leave", [
        animate(
          "0.25s ease-out",
          style({
            opacity: 0,
            transform: "translateY(5%)"
          })
        )
      ])
    ])
  ]
})

export class AppComponent implements OnInit {
  allTasks: Task[]
  filteredTasks: Task[];
  filterSettings: any;

  tasks$: Observable<Task[]>;
  errors$: Observable<string[]>;
  loading$: Observable<boolean>;
  title = "app";
  isAddFormCollapsed: boolean = true;
  isFilterFormCollapsed: boolean = true;

  showModal = false;
  constructor(
    private tasksService: TasksService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.tasks$ = this.tasksService.tasks;
    this.errors$ = this.tasksService.errors;
    this.loading$ = this.tasksService.loading;
    this.tasks$.subscribe(res => {
      this.allTasks = res;
      this.filteredTasks = this.filterTasks(this.allTasks);
    });
    this.loading$.subscribe(res => {
      if (res) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
    this.tasksService.getAllTasks();
    this.tasksService.getAllTags();
    this.filterSettings = {
      [filterChangeTypes.searchInput]: '',
      [filterChangeTypes.titleCheck]: true,
      [filterChangeTypes.descriptionCheck]: true,
      [filterChangeTypes.fromDate]: null,
      [filterChangeTypes.toDate]: null,
      [filterChangeTypes.includeTags]: [],
      [filterChangeTypes.excludeTags]: []
    }
  }

  toggleForm(e) {
    e.stopPropagation();
    this.isAddFormCollapsed = !this.isAddFormCollapsed;
    return this.isAddFormCollapsed;
  }

  onFilterBtnClicked(e) {
    e.stopPropagation();
    this.isFilterFormCollapsed = !this.isFilterFormCollapsed;
    return this.isFilterFormCollapsed;
  }

  onChangeTaskFilter(e) {
    if(!e.filterType === undefined || !e.filterValue === undefined){
      return;
    }
    this.filterSettings[e.filterType] = e.filterValue;
    this.filteredTasks = this.filterTasks(this.allTasks);
  }

  filterTasks(tasks: Task[]): Task[]{
    return tasks.filter( task => this.keepTask(task));
  }

  removeAlert(index: number) {
    this.tasksService.removeError(index);
  }

  onClickedOutside(e) {
    if (e && e.target.classList.contains("custom-day")) {
      return;
    }
    this.isAddFormCollapsed = true;
  }

  collapseFilterForm() {
    this.isFilterFormCollapsed = true;
  }

  keepTask(task: Task): boolean{
    let titlePass = true;
    let descriptionPass = true;
    let datePass = true;
    let tagsPass = true;

    // Search Input
    if(this.filterSettings[filterChangeTypes.searchInput].trim() !== ''){
      if(this.filterSettings[filterChangeTypes.titleCheck]){
        titlePass = task.title.toLowerCase().includes(this.filterSettings.searchInput.toLowerCase());
      }
      if(this.filterSettings[filterChangeTypes.descriptionCheck]){
        descriptionPass = task.description.toLowerCase().includes(this.filterSettings.searchInput.toLowerCase());
      }
    }
    // Date
    if(this.filterSettings[filterChangeTypes.fromDate]){
      let dueDate = new Date(task.dueDate);
      let fromDate = this.filterSettings[filterChangeTypes.fromDate];
      let toDate = this.filterSettings[filterChangeTypes.toDate];

      if(!this.filterSettings[filterChangeTypes.toDate]){
        // only show tags of from date
        datePass = dueDate.getFullYear() === fromDate.year &&
          dueDate.getMonth() + 1 === fromDate.month &&
          dueDate.getDate() === fromDate.day
      }
      else{
        // show tags from fromDate to toDate
        datePass = dueDate.getFullYear() >= fromDate.year &&
        dueDate.getMonth() + 1 >= fromDate.month &&
        dueDate.getDate() >= fromDate.day &&
        dueDate.getFullYear() <= toDate.year &&
        dueDate.getMonth() + 1 <= toDate.month &&
        dueDate.getDate() <= toDate.day;
      }
    }
    // Tags
    tagsPass = this.filterSettings.includeTags.every((tag) => task.tags.includes(tag)) &&
    this.filterSettings.excludeTags.every((tag) => !task.tags.includes(tag));

    return titlePass && descriptionPass && datePass && tagsPass;
  }

}
