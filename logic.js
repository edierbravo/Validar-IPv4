/* 
- Primer caracter diferente de punto '.'
- Maxima langitud de la cadena 15 caracteres, pero cambia de acuerdo a los caracteres digitados
- Minima longitud de cadena 7 caracteres
- Maximo 3 caracteres de punto
- Maximo 4 grupos de 3 digitos
- Eliminar ceros a la izquierda en los grupos de 3 digitos
- Valor numerico de cada grupo en el rango entre 0 y 255
- No se permiten puntos consecutivos
- Autocompletar el punto despues de digitar 3 caracteres numericos
- Solo se permiten caracteres numericos y el punto
No se permite copiar y pegar en el cuadro de texto */

function validateIPAddress() {
  const ipAddressInput = document.getElementById("ip-address");

  if (ipAddressInput.value === "") {
    alert("No se ingresó ninguna dirección IP");
  } else if (!/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ipAddressInput.value)) {
    alert("La dirección IP debe tener 4 numeros separados por puntos y cada numero debe tener maximo 3 cifras");
  } else {
    const parts = ipAddressInput.value.split(".");
    let isValid = true;

    for (let i = 0; i < parts.length; i++) {
      const part = parseInt(parts[i]);

      if (part < 0 || part > 255 || isNaN(part)) {
        isValid = false;
        break;
      }

      // Eliminar los ceros a la izquierda en cada parte de la dirección IP
      parts[i] = part.toString();
    }

    if (isValid) {
      // Actualizar el valor del input con la dirección IP normalizada
      const normalizedIP = parts.join(".");
      ipAddressInput.value = normalizedIP;

      alert(`La dirección IP ${normalizedIP} es CORRECTA`);
    } else {
      alert("La dirección IP debe tener 4 numeros separados por puntos y cada número debe estar entre 0 y 255");
    }
  }
}

function agregarPuntos() {
  const ipAddressInput = document.getElementById("ip-address");

  ipAddressInput.addEventListener("input", () => {
    const inputValue = ipAddressInput.value;

    // Agregar punto si hay tres números consecutivos y no se ha escrito el último bloque
    if (inputValue.length < 15 && /^[0-9]{3}$/.test(inputValue.slice(-3)) && (inputValue.match(/\./g) || []).length < 3) {
      ipAddressInput.value = inputValue + ".";
    }
  });
}

function noCopyPaste() {
  const ipAddressInput = document.getElementById("ip-address");

  ipAddressInput.addEventListener("paste", (event) => {
    event.preventDefault();
  });
}

