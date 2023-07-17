import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgControlStatus, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent {

  constructor(private fb:FormBuilder,
              private validadores:ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get pass1NoValido(){
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2)? false : true;
  }

   validarCampo(nombreCampo:string):boolean{

    switch(nombreCampo){
      case 'apellido': 
        return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
        break;

      case 'correo': 
        return this.forma.get('correo').invalid && this.forma.get('correo').touched
        break;

      case 'usuario': 
        return this.forma.get('usuario').invalid && this.forma.get('usuario').touched
        break;

      case 'direccion.distrito':
        return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched
        break;

      case 'direccion.ciudad':
        return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched
        break;

      default:
        return false
        break;

    }

  }

  forma:FormGroup;

  crearFormulario(){
    this.forma = this.fb.group({
      nombre  : ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required,this.validadores.noHerrera]],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario  :['',,this.validadores.existeUsuario],
      pass1    :['',Validators.required],
      pass2    :['',Validators.required],
      direccion: this.fb.group({
       distrito: ['',Validators.required],
       ciudad  : ['', Validators.required]
      }),
      pasatiempos: this.fb.array([
      ])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
      
    });
  }

  cargarDataAlFormulario(){
    // this.forma.setValue({ necesita mandar todos los datos el reset solo los que me interesan
      this.forma.reset({
      "nombre": "Melanie", "apellido": "Contreras", "correo": "melanie@gmail.com", "pass1":"123","pass2":"123","direccion": { "distrito": "Mèxico", "ciudad": "CDMX"}
    });

    //Forma de insertar los datos o usando el set values pero se tendria que rstablecer cada una de las proidades y ya no podria usar el reset 

    // ['Resolver Puzzles', 'Cocinar'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('', Validators.required));
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){

    if(this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        console.log(control);
        if(control instanceof FormGroup){
          Object.values(control.controls).forEach( control => control.markAllAsTouched())
        }else{
          control.markAsTouched();
        }
      });
    }
    console.log(this.forma);
    
    //posteo de la información - se tendra que hacer el reset del formulario

    this.forma.reset({
      nombre:'sin nombre'
    });
  }

}
