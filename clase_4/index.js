// const delay = (ret) => {
//   for (let i = 0; i < ret * 3e6; i++);
// };

// function hacerTarea(num) {
//   console.log("haciendo tarea " + num);
//   delay(100);
// }

// console.log("inicio de tareas");
// hacerTarea(1);
// hacerTarea(2);
// hacerTarea(3);
// hacerTarea(4);
// console.log("fin de tareas");
// console.log("otras tareas ...");

// function hacerTarea(num, cb) {
//   console.log("haciendo tarea " + num);
//   setTimeout(cb, 100);
// }

// console.log("inicio de tareas");
// hacerTarea(1, () => {
//   hacerTarea(2, () => {
//     hacerTarea(3, () => {
//       hacerTarea(4, () => {
//         console.log("fin de tareas");
//       });
//     });
//   });
// });
// console.log("otras tareas ...");

// import fs from "fs";
// try {
//   fs.writeFileSync("./fyh.txt", Date().toString());
//   const datos = fs.readFileSync("./fyioio.txt", "utf-8");
//   console.log(datos);
// } catch (err) {
//   throw new Error(`No pudimos ejecutar la acción: ${err.message}`);
// }

// import fs from "fs";

// const ruta = "./package.json";
// fs.readFile(ruta, "utf-8", (err, data) => {
//   if (err) throw new Error(`No se puede leer el archivo: ${err.message}`);

//   const info = {
//     contenidoStr: JSON.stringify(data),
//     contenidoObj: JSON.parse(data),
//     size: fs.statSync(ruta).size,
//   };

//   console.log(info);

//   fs.writeFile("./info.txt", JSON.stringify(info, null, 2), (e) => {
//     if (e) throw new Error(`Se produjo un error: ${e.message}`);
//   });
// });

import fs from "fs";

const prueba = async () => {
  try {
    const contenido = await fs.promises.readFile("./info.txt", "utf-8");
    console.log(contenido);
    const objInfo = JSON.parse(contenido);
    objInfo.contenidoObj.author = "Coderhouse";
    await fs.promises.writeFile(
      "./package.json.coder",
      JSON.stringify(objInfo, null, 2)
    );
  } catch (err) {
    throw new Error(`Problemas`);
  }
};

prueba();
