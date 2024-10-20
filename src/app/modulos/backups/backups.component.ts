import { Component } from '@angular/core';
import { PostbackupsComponent } from './postbackups/postbackups.component';

@Component({
  selector: 'app-backups',
  standalone: true,
  imports: [PostbackupsComponent],
  templateUrl: './backups.component.html',
  styleUrl: './backups.component.css'
})
export class BackupsComponent {

}
