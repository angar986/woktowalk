var totalcal=0;
var totalgram=0;
var preciototal=0;
var paso=1;
var platos=new Array();
$(document).ready(function(){
	strechfondo();
	centerModal();
	/*$('#modalcuantos,#modalmicuenta').on('hide.bs.modal', function (e) {
			 return e.preventDefault() // stops modal from being hide
	});*/
});

$(window).resize(function(){
	strechfondo();
	centerModal();
});

function strechfondo(){
	$('#imgfondo').css('height',$(window).height());
	var posx=(parseInt($('#imgfondo').css('width'))-parseInt($(window).width()))/2;
	$('#imgfondo').css('left',-posx);
	$('.container').css('height',$(window).height());
	$('#cabeza').css('height',$(window).height()*10/100);
	$('#cuerpo').css('height',$(window).height()*85/100);
	$('.ingrediente').css('height',$('#contentpaso').height()/4.5);
	$('.ingrediente img').css('height',$('.ingrediente').height()*50/100);
}

function centerModal(){ 
			$(this).css('display', 'block');
			var $dialog = $(this).find(".modal-dialog");
			var offset = ($(window).height() - $dialog.height()) / 2;
			// Center modal vertically in window
			$dialog.css("margin-top", offset);
	}
	
function AgregarBase(cual){
	document.getElementById('tablabase').innerHTML='';
	totalcal=parseFloat(cual.getAttribute('cal'));
	totalgram=parseFloat(cual.getAttribute('gram'));
	preciototal=parseFloat(cual.getAttribute('precio'));
	$('#totalcalorias').html(totalcal);
	$('#totalgramos').html(totalgram);
	$('#totalprecio').html(preciototal.toFixed(2));
	var fila=document.createElement('tr');
	var col=document.createElement('td');
	fila.appendChild(col);
	col.innerHTML="<div class='agregado' id='agregado_"+cual.getAttribute('id')+"'><div class='label label-danger' style='margin:3px; cursor:pointer;' onclick='QuitarIngrediente("+cual.getAttribute('id')+");'>X</div><span class='nombreagregado'>"+cual.getAttribute('nombre')+"</span></div>";
	document.getElementById('tablabase').appendChild(fila);
}

function AgregarIngrediente(cual){
	totalcal+=parseFloat(cual.getAttribute('cal'));
	totalgram+=parseFloat(cual.getAttribute('gram'));
	preciototal+=parseFloat(cual.getAttribute('precio'));
	$('#totalcalorias').html(totalcal);
	$('#totalgramos').html(totalgram);
	$('#totalprecio').html(preciototal.toFixed(2));
	var fila=document.createElement('tr');
	var col=document.createElement('td');
	fila.appendChild(col);
	col.innerHTML="<div class='agregado' id='agregado_"+cual.getAttribute('id')+"'><div class='label label-danger' style='margin:3px; cursor:pointer;' onclick='QuitarIngrediente("+cual.getAttribute('id')+");'>X</div><span class='nombreagregado'>"+cual.getAttribute('nombre')+"</span></div>";
	document.getElementById('tablaagregados').appendChild(fila);
}

function AgregarSalsa(cual){
	var existesalsa=$('#tablasalsa .agregado');
	if(existesalsa.length>0){
		var data=existesalsa.attr('id').split('_');
		totalcal-=parseFloat($('#'+data[1]).attr('cal'));
		totalgram-=parseFloat($('#'+data[1]).attr('gram'));
		preciototal-=parseFloat($('#'+data[1]).attr('precio'));
		$('#tablasalsa').html('');
	}
	totalcal+=parseFloat(cual.getAttribute('cal'));
	totalgram+=parseFloat(cual.getAttribute('gram'));
	preciototal+=parseFloat(cual.getAttribute('precio'));
	$('#totalcalorias').html(totalcal);
	$('#totalgramos').html(totalgram);
	$('#totalprecio').html(preciototal.toFixed(2));
	var fila=document.createElement('tr');
	var col=document.createElement('td');
	fila.appendChild(col);
	col.innerHTML="<div class='agregado' id='agregado_"+cual.getAttribute('id')+"'><div class='label label-danger' style='margin:3px; cursor:pointer;' onclick='QuitarIngrediente("+cual.getAttribute('id')+");'>X</div><span class='nombreagregado'>"+cual.getAttribute('nombre')+"</span></div>";
	document.getElementById('tablasalsa').appendChild(fila);
}

function QuitarIngrediente(elid){
	var elemento=$('#'+elid);
	$('#agregado_'+elid).remove();
	totalcal-=parseFloat(elemento.attr('cal'));
	totalgram-=parseFloat(elemento.attr('gram'));
	preciototal-=parseFloat(elemento.attr('precio'));
	$('#totalcalorias').html(totalcal);
	$('#totalgramos').html(totalgram);
	$('#totalprecio').html(preciototal.toFixed(2));
	
}

function Pasar(){
	if(paso==1){
		$('#opcionesbase').css('display','none');
		$('#opcionesfavoritos').fadeIn();
		$('#frase').html("ESCOGE TUS FAVORITOS");
		$('#npaso').html("2");
		var porcen=0;
		var t=setInterval(function(){
			if(porcen<33){
				porcen+=1;
				var mip=porcen;
				$('.progress-bar').css('width',mip+"%");
				$('.progress-bar').html(mip+"%");
			}else{
				clearInterval(t);
			}
		},10);
		
		paso++;
	}else if(paso==2){
		$('#opcionesfavoritos').css('display','none');
		$('#opcionessalsas').fadeIn();
		$('#frase').html("ESCOGE TU SALSA");
		$('#npaso').html("3");
		var porcen=33;
		var t=setInterval(function(){
			if(porcen<66){
				porcen+=1;
				var mip=porcen;
				$('.progress-bar').css('width',mip+"%");
				$('.progress-bar').html(mip+"%");
			}else{
				clearInterval(t);
			}
		},10);
		paso++;
	}else if(paso==3){
		var porcen=66;
		var t=setInterval(function(){
			if(porcen<100){
				porcen+=1;
				var mip=porcen;
				$('.progress-bar').css('width',mip+"%");
				$('.progress-bar').html(mip+"%");
			}else{
				clearInterval(t);
				VerCuenta();
			}
		},10);
		
	}
}

function ArmarOtroplato(como){
	if(como==1)
		GuardarMiPlato();
	$("#modalcuantos,#modalmicuenta").modal("hide");
	$("#opcionesfavoritos,#opcionessalsas").css('display','none');
	$('#frase').html("ESCOGE TU BASE");
	$('#npaso').html("1");
	$("#opcionesbase").fadeIn();
	$('.progress-bar').css('width',"0%");
	$('.progress-bar').html("0%");
	paso=1;
}

function GuardarMiPlato(){
		var arrayfavoritos=new Array();
		$('#tablaagregados .agregado').each(function(){
			var data=$(this).attr('id').split('_');
			arrayfavoritos.push(data[1]);
		})
		var misalsa;
		var existesalsa=$('#tablasalsa .agregado');
		if(existesalsa.length>0){
				var data=existesalsa.attr('id').split('_');
				misalsa=data[1];
		}
		var mibase;
		var existebase=$('#tablabase .agregado');
		if(existebase.length>0){
				var data=existebase.attr('id').split('_');
				mibase=data[1];
		}
		var cuantospido=$('#cuantosplatos').val();
		if(arrayfavoritos!=null&&misalsa!=null&&mibase!=null){
			var arrayplato=new Array(mibase,arrayfavoritos,misalsa,totalcal,totalgram,preciototal,cuantospido);
			platos.push(arrayplato);
			totalcal=0;
			totalgram=0;
			preciototal=0;
			$('#totalcalorias').html(totalcal);
			$('#totalgramos').html(totalgram);
			$('#totalprecio').html(preciototal.toFixed(2));
			$('#tablabase,#tablasalsa,#tablaagregados').html('');
		}
		console.log(platos);
}

function VerCuenta(){
	GuardarMiPlato();
	var totaltotal=0;
	$('#tablamisplatos tbody').html('');
	for(var n=0;n<platos.length;n++){
		var fila=document.createElement('tr');
		var ptotal=parseFloat(platos[n][5])*parseFloat(platos[n][6]);
		var mibase=$('#'+platos[n][0]).attr('nombre');var mibase=$('#'+platos[n][0]).attr('nombre');
		var misalsa=$('#'+platos[n][2]).attr('nombre');
		var cadfavoritos='';
		for(var t=0;t<platos[n][1].length;t++){
			if(t>0)
				cadfavoritos+=',';
			cadfavoritos+=$('#'+platos[n][1][t]).attr('nombre');
		}
		totaltotal+=parseFloat(platos[n][5]);
		fila.innerHTML="<td><div>Plato"+(n+1)+": </div></td><td>"+platos[n][6]+"</td><td>"+platos[n][5].toFixed(2)+"</td><td>"+ptotal.toFixed(2)+"</td><td><button type='button' id='btnpop"+n+"' class='btn btn-default' data-container='body' data-toggle='popover' data-placement='right' data-content='"+"<b>Base: </b>"+mibase+"<br/><b>Favoritos: </b>"+cadfavoritos+"<br/><b>Salsa: </b>"+misalsa+"'>Detalles</button></td>";
		$('#tablamisplatos tbody').append(fila);
		$('#btnpop'+n).popover({
			trigger: 'hover','placement': 'right',
			html : true
		});
	}
	$('#prectotalpedido').html(totaltotal.toFixed(2));
	$("#modalcuantos").modal("hide");
	$("#modalmicuenta").modal("show");
}