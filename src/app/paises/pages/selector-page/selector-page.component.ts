import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  FormControl } from '@angular/forms';

import { switchMap, tap} from 'rxjs/operators'
import { PaisesServiceService } from '../../services/paises-service.service';
import {Pais} from '../../interfaces/pais';
import { PaisByCode } from '../../interfaces/paisByCode';
@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

myForm:FormGroup=this.fb.group({
  region: ['',Validators.required],
  pais:['',Validators.required],
  frontera:['', Validators.required]
})
  constructor(private fb:FormBuilder, private ps:PaisesServiceService) { }
regiones:string[]=[];
paises:Pais[]=[]
fronteras:Pais[]=[]
ngOnInit(): void{
  this.regiones=this.ps.regiones;
  //cuando cambia la region
  this.myForm.get('region')?.valueChanges
  .pipe(tap(region=>{this.myForm.get('pais')?.reset('')})
    ,switchMap(region=>
    this.ps.getPaises(region)
  )
  ).subscribe(paises=>{
    this.paises=paises
  })

//cuando cambia el pais 
this.myForm.get('pais')?.valueChanges
.pipe(tap(dato=>{this.fronteras=[]
this.myForm.get('frontera')?.reset('')
}),
switchMap(pais=>this.ps.getFronteras(pais)
),
switchMap(pais=>this.ps.getPaisesPorCodigos(pais?.borders!))
)
.subscribe(fronteras=>{
  this.fronteras=fronteras
    
  })
  


}
  // ngOnInit(): void {
  //   this.regiones=this.ps.regiones;
  //   this.myForm.get('region')?.valueChanges.subscribe
  //   (dato=>{
      
  //     this.ps.getPaises(dato).subscribe(dato=>{
  //       this.paises=dato
  //       this.myForm.get('pais')?.reset('')
  //       console.log(dato)
  //     })
  //   })
  // }

}
