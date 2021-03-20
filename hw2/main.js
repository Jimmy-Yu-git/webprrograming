window.onload = function()
{
	var btr = document.getElementById("next");
	var btl = document.getElementById("previous");
	var img = document.getElementById("display");
	var imgarr = ["https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2017/02/17/20170217-110627_U7533_M248445_fa92.jpg?itok=GDVDbk5_",
				"https://www.supermoto8.net/images/article/e358c8d80420e63fe12d6f7219a2592b2.jpg",
				"https://thenationpress.net/imgs/2020/08/1597511700blobid0.jpg",
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClBsTR4utyFD5y7k3yFFKZjq9RSTEA8n3rg&usqp=CAU",
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPqcJbWQxsF-4XRqTvQlC-EgVsmOfPQo_aw&usqp=CAU"];
	var index = 0;
	var count = 0; 
	var posi = document.getElementById("source");
	var pbd = document.getElementById("pid");
	pbd.innerHTML = "Tota0l have"+imgarr.length+"picture , current"+(index+1);
	posi.innerHTML = imgarr[index];
	var playBTN = document.getElementById('playBTN');
	playBTN.onclick =function playpause(){
		
		 count++;
		 time=count%2;
		 if(time==0){
		 	audio.pause();
		 	playBTN.innerHTML = "&#9646;";
		 }
		 else if (time!=0){
		 	audio.play();
		 	playBTN.innerHTML = "&#9658;&#10074;";
		 }
	}
	// window.addEventListener("load", playpause);
	//audio.loop = true;
	if (index == 0) {
	document.getElementById("previous").className = 'disabled';
}
	btr.onclick = function(){
		index++;
		if (index>0){
			document.getElementById('previous').className='';

		}
		if (index>imgarr.length-1){
			document.getElementById('next').className = "disabled";
			//a=function(){btr.onclick.stopPropagation();}
			index=imgarr.length-1;
		}
		
		img.setAttribute("src", './image/loading.gif');
			setTimeout(function(){img.src=imgarr[index]},300);
		posi.href=imgarr[index];
		pbd.innerHTML = "Total have"+imgarr.length+"picture , current"+(index+1);
		posi.innerHTML=imgarr[index];
		
	}
	btl.onclick = function(){
		index--;
		if (index<imgarr.length-1){
			document.getElementById('next').className='';

		}
		if (index<0){
			document.getElementById('previous').className = "disabled";
			//a=function(){btl.onclick.stopPropagation();}
			index=0;	
		}
		img.setAttribute("src", './image/loading.gif');
		setTimeout(function(){img.src=imgarr[index];},300)
		posi.href=imgarr[index];
		pbd.innerHTML = "Total have"+imgarr.length+"picture , current"+(index+1);
		posi.innerHTML=imgarr[index];
		
	}
}