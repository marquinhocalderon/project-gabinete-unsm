import { Component, Input } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-verfotosgabinetes',
  standalone: true,
  imports: [],
  templateUrl: './verfotosgabinetes.component.html',
  styleUrl: './verfotosgabinetes.component.css'
})
export class VerfotosgabinetesComponent {

  @Input() modalId!: string;

  ngOnInit(): void {
    initFlowbite();
  }

}
