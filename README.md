# App Weather RAF

Aplicación responsiva de Clima Actual y pronóstico para los próximos 3 días. Consume una API y muestra los datos.

### Información General

---

- La aplicación permite buscar por nombre de ciudad y valida que sea un nombre.
- Usa la funcionalidad de geolocalizacion del navegador (previa aceptación del usuario) y consulta datos en la API.
- Permite consultar la información en sistema métrico o imperial (°Celsius o °Fahrenheit ).
- Adicional a esto, guarda las últimas 10 ciudades buscadas por el usuario y se pueden borrar una por una, si así lo requiere.
- Probado en Safari, Chrome, Brave, Firefox. Aunque este último no instala la PWA.

### Tecnologías

---

Tecnologías usadas:

- HTML5 / CSS3
  - Se consideraron aspectos de accesibilidad.
  - Es responsive.
- JavaScript
  - ECM6
  - Puede instalarse como PWA
- Jest
  - Se realizaron test unitarios
- webpack
  - Para desplegar la app

### Instalación

---

Para clonar repositorio

```
$ git clone https://github.com/robft88/app-weather.git
```

Para instalar las dependencias

```
$ npm install
```

Para desplegar la aplicación en un servidor local

```
$ npm start
```

Para realizar los tests:

```
$ npm run test:watch
```

### Proyecto Desplegado - Imágenes

---

Para ver la app en línea:  
https://app-weather-raft.netlify.app/

Imagenes:  
![Image Text](https://firebasestorage.googleapis.com/v0/b/portfolio-raft.appspot.com/o/app-weather.png?alt=media&token=edb786a1-83a1-446b-84cd-d022dbf78efe)
