var dropzone = document.getElementById('dropzone'); 

var upload = function(files){
  var formData = new FormData(),
    xhr  = new XMLHttpRequest(),
    x; 
    for(x = 0 ; x< files.length ; x = x+1 ){
      formData.append('file[]',files[x])
    }

    xhr.onload = function(){
      var data = this.responseText
      console.log(data)
    }
    xhr.open('post',)
    xhr.send()
  }

dropzone.ondrop = function(e){
  e.preventDefault() // prevent default open image action
  this.className = 'dropzone'
  upload(e.dataTransfer.files)

}

dropzone.ondragover = function(){
  this.className = 'dropzone dragover'
  return false 
}

dropzone.ondragleave = function(){
  this.className = 'dropzone'
  return false 
}
