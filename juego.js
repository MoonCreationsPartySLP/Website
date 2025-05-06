var fila=4; 
var col=4;
var datos = new Array(4); /* ARRAY 4 ELEMENTOS PARA IR GUARDANDO DATOS DE POSICIONES DE CARTAS */
var clics=0; /* VARIABLE GUARDA CLICS ACTIVOS */
var imgclic=[-1,-1];
var par = new Array(8); /* ARRAY 4 ELEMENTOS PARA IR GUARDANDO CARTA 1 DE CADA PAR */
var pars = new Array(8); /* ARRAY 4 ELEMENTOS PARA IR GUARDANDO CARTA 2 DE CADA PAR */
var cp=0; /* VARIABLE GUARDA PARES ENCONTRADOS */
var ct=0; /* VARIABLE GUARDA CLICS TOTALES */

function tabla(){
var texto="<table border=0>"; //inicializa la tabla
var check =[]; /* VARIABLE CHECA NO REPETICIÓN DE NUMEROS */
var i,j,k,num=0,div=0;

	for (i = 0; i < 8; i++)
		check[i]=0; 
		par[i]=0; /* SE INICIAN EN 0 ESTOS ARRAYS */
		pars[i]=0;
		for (i = 0; i < fila; i++) { 
			datos[i] = new Array(4); /* EN CADA POSCICION SE AGREGA UN ARRAY DE 4 */
			texto+="<tr>"; /* ABRE FILA */
			for (j = 0; j <col; j++) { 
				do{	
					num=Math.floor(Math.random()*8) /* GENERA UN NUMERO ENTERO ALEATORIO DE 0 A 8 */
				}while(check[num]==2); /* CHECA GENERADO NO EXISTA AUN DOS VECES */
			check[num]++; /* AUMENTA LAS VECES DE QUE SE HA GENERADO UN NUMERO */
			datos[i][j]=num; /* GUARDA EL NUMERO GENERADO EN LA POSICIÓN ACTUAL */
			texto+="<td class='carta'>"+"<img src='"+num+".png' width=140 height=140 border=0></td>"+"</td>"; /* GUARDA LA IMAGEN EN CELDA*/	
		}
		texto+="</tr>"; /* CIERRA FILA */
	}
	texto+="</table>"; /* CIERRA TABLA */
  document.getElementById('boton').style.display = 'none';
  document.getElementById("tablero1").innerHTML = texto; /* MUESTRA TABLA */
  setTimeout("jugar()",5000) ;//10 segs

}

function jugar()
{
	var texto="<table border=0>"; 
	var check =[];
	var i,j, num=0;
	for (i = 0; i < fila; i++) { 
		texto+="<tr>";
		for (j = 0; j <col; j++){
			texto+="<td>"+"<img id='"+num+"' onclick='seleccion("+i+","+j+","+num+")' src='cartaoculta.png' width=140 height=140 border=0></td>";
			num++;	
		}
		texto+="</tr>";
	}
	texto+="</table>";  
  document.getElementById("tablero1").innerHTML = texto; /* MUESTRA TODAS LAS CARTAS OCULTAS */
}
function voltear(){
	document.getElementById(imgclic[0]).src="cartaoculta.png";
	document.getElementById(imgclic[1]).src="cartaoculta.png"; /* VOLTEA CARTAS CLICKEADAS */
	imgclic[0]=-1; /* REINICIA LAS POSICIONES DE LOS CLICKS  */
	imgclic[1]=-1;
}
function score(cp,ct,clics){
	if (cp==8) {
		document.getElementById("win").innerHTML= " ¡¡ G A N A S T E !! "; /* MUESTRA MENSAJE  */
		alert("¡¡ FELICIDADES HAS GANADO !!");
	}
	document.getElementById("paresen").innerHTML= "Pares Encontrados: " + cp; /* MUESTRA PARES ENCONTRADOS */
	document.getElementById("clict").innerHTML= "Clicks Totales: " + ct; /* MUESTRA CLICS TOTALES  */
	document.getElementById("clicts").innerHTML= "Clicks Activos: " + clics; /* MUESTRA CLICS ACTIVADOS  */
}
function seleccion(i,j,id){
	ct++; /* AUMENTA CLICS TOTALES  */
	if(clics<2){ /* SI ES EL 1° CLIC */
		if(par[datos[i][j]]==1 || pars[datos[i][j]]==1){ /* SI DAN CLIC EN UNA CARTA YA ENTRADA MUESTRA MENSAJE */
			alert("SELECCIONASTE UN PAR");
		}else if (clics==1 && id==imgclic[clics-1]) { /* SI DAN CLIC 2 VECES EN UNA MISMA CARTA  MUESTRA MENSAJE */
			alert("CARTA REPETIDA");
		}else{
			imgclic[clics]=id; 
			clics++; /* AUMENTA CLICS ACTIVOS  */
			document.getElementById(id).src=datos[i][j] + ".png";
			if (clics==2) {
				clics=0; /* REINICIA CLICS ACTIVOS  */
				if(par[datos[i][j]]==1 || pars[datos[i][j]]==1){ /* SI DAN CLIC EN UNA CARTA YA ENTRADA MUESTRA MENSAJE */
					alert("SELECCIONASTE UN PAR");
				}else{
					if (document.getElementById(imgclic[0]).src == document.getElementById(imgclic[1]).src) { /*SI ES PAR*/
						par[datos[i][j]]=1; /* GUARDA LA CARTA 1 DEL PAR ENCONTRADO  */
						pars[datos[i][j]]=1; /* GUARDA LA CARTA 2 DEL PAR ENCONTRADO  */
						cp++; /* AUMENTA PAR ENCONTRADO  */
					}else if (document.getElementById(imgclic[0]).src != document.getElementById(imgclic[1]).src) { /*SI NO ES PAR*/
						setTimeout("voltear()",800); /* MANDA LLAMAR FUNCION PARA VOLTEAR CARTAS */
					}
				}
				
			}
		}
	}
	score(cp,ct, clics);
}