import { Component, OnInit } from '@angular/core';
import { EquipmentService, Equipment, EquipmentCategory } from '../../shared/service-proxy/equipment.service'

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  equipments: Equipment[] = [];
  equipmentsFilter: Equipment[] = [];
  categories: EquipmentCategory[] = [];
  selectedEquipment: Equipment = null;
  selectedCategory: EquipmentCategory;
  showPopItem: boolean = false;
  pop_left: string = "0px";
  pop_top: string = "0px";

  constructor(private service: EquipmentService) { }

  ngOnInit() {
    this.categories = this.service.getAllCategory();
    this.selectedCategory = this.categories[0];
    this.getEquipments();
  }

  getEquipments(): void {
    this.service.getAll()
      .subscribe(equipments => {
        this.equipments = equipments;
        this.equipmentsFilter = equipments;
      })
  }

  selectCategory(current: EquipmentCategory): void {
    this.selectedCategory = current;
    this.equipmentsFilter = [];
    if (current.id > 0) {
      for (let index = 0; index < this.equipments.length; index++) {
        if (this.equipments[index].Category == current.id)
          this.equipmentsFilter.push(this.equipments[index]);
      }
    } else {
      this.equipmentsFilter = this.equipments;
    }
  }

  equipmentOnMouseOver(current: Equipment, event: MouseEvent): void {
    this.selectedEquipment = current;
    this.showPopItem = true;
    this.equipmentOnMouseMove(event);
  }

  equipmentOnMouseMove(event: MouseEvent) {
    if (event.clientX + 300 > document.body.clientWidth) {
      this.pop_left = (event.clientX - 280) + "px";
    } else {
      this.pop_left = (event.clientX + 20) + "px";
    }

    this.pop_top = (event.pageY - 100) + "px";
  }

  equipmentOnMouseOut(): void {
    this.showPopItem = false;
  }
}
