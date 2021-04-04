# LaLiga React

Este proyecto se creó con [Create React App](https://github.com/facebook/create-react-app).

## Instalación 🔧

En la raíz del proyecto puedes ejecutar estos comandos para instalar las dependencias del proyecto:

```
npm install o yarn
```

## Comenzando 🚀

En la raíz del proyecto puedes ejecutar estos comandos para iniciar el proyecto:

```
npm start o yarn start
```

Se iniciará la aplicación en el puerto **http://localhost:3000**.

## Ejecutando las pruebas ⚙️

Debido a que era un apartado opcional decidí hacer un test simple del flujo completo de la aplicación a través de la herramienta [Cypress](https://www.cypress.io/).

Este test se encuentra en la rama: **test/add-cypress-test**. Es importante que estas pruebas corran en el puerto **http://localhost:3000** debido a que está preparado para ello.

Instala las dependencias a través de los comandos mencionados anteriormente y ejecuta el siguiente comando:

```
npx cypress open
```

## Librerías 📖

Sólo se hizo uso de una librería adicional a las requeridas, dicha librería es [Ant Design](https://ant.design/), es una libería de diseño que me parece muy completa y perfecta para este tipo de aplicaciones ya que me ayuda con una cantidad grande de componentes creados, iconos, validaciones, etc.

## Sólo React Context 🙇‍♂️

En la rama **feat/use-only-react-context** podréis encontrar una versión de la aplicación utilizando solamente el contexto de React y olvidándonos de Redux, para aplicaciones tan pequeñas (y algunas medianas) soy partidario de usar sólo el contexto.

Entiendo que necesitáis conocer mis habilidades con Redux y por eso hacéis la prueba de este modo. Aún así dejo un inicio de la aplicación sólo utilizando el contexto, se puede mejorar muchísimo más en todos los aspectos pero debido a que no es un requisito no le voy a dedicar mucho más tiempo.

## Pequeña advertencia ❗

Al cambiar de ramas la opción "end of line" se me ha cambiado a CRLF y esto me produce errores en la aplicación. Si en cualquier momento veis un mensaje como este:

```
Line xx:xx:   Delete `␍`  prettier/prettier
```

Sólo hay que cambiar la opción CRLF por LF del archivo en tu editor.

---
