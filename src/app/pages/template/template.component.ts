import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit{

  constructor(private paisService:PaisService) {
    
  }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(paises=>{
      this.paises=paises;
      this.paises.unshift({nombre:'[Selecione un Pais]', codigo:''});
      // console.log(this.paises);
      
    })
  }

  usuario = {
    // nombre: '',
    // apellido:'',
    // correo:''

    nombre: 'Melanie',
    apellido:'Contreras',
    correo:'melanie@gmail.com',
    pais:'MEX',
    genero:'F'
  }

  paises: any[] =[];

  guardar(forma:NgForm){
    // console.log(forma);
     console.log(forma.value);
    // console.log(forma.form.controls);
    
    if (forma.invalid) {
      Object.values(forma.controls).forEach(control =>{
        control.markAsTouched();
      });
      return;     
    }
  }

}
