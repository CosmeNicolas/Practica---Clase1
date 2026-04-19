
    function cambiarTexto(){
      document.getElementById("titulo").innerText = "Texto cambiado";
    }

    function volverTextoOriginal(){
      document.getElementById("titulo").innerText = "Hola mundo 💪🏼";
    }

    function numeroAleatorio(){
      let numero = Math.floor(Math.random() * 100) + 1;
      return numero;
    }

    const nuevoMensaje = () => {
      let msj = prompt("Escribe un nuevo mensaje para el título:");
      if(msj = true){
        alert("¡Mensaje actualizado!");
      }
      return msj
    }

    const nuevoMensaje2 =() => {
      let msj2 = window.confirm("¿Deseas cambiar el mensaje del título?");
      if(msj2 === true){
        alert('nuevo mensaje actualizado');
      } else{
        alert('mensaje no actualizado');
      }
    }
