import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {

  url: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {    
    setTimeout(() => {
      this.loadPDF();
    },1050);
  }

  loadPDF(): void {
    var origin = window.location.origin + '/file?url=';
    this.url = window.location.href;
    this.url = this.url.replace(origin, '');
    this.url = decodeURIComponent(this.url);
    var frame = (<HTMLIFrameElement>document.getElementById('assetDivIdMob'));
    frame.src = 'https://docs.google.com/gview?embedded=true&url=' + this.url;
    frame.contentWindow.document; 
    setTimeout(this.loadPDF, 2000);
  }

}