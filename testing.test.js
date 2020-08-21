const vendedoras = ["Ada", "Grace", "Hedy", "Sheryl"];
const ventas = [
[ 100000000, 4, 2, 2019, 'Grace', 'Centro', ['Monitor GPRS 3000',
'Motherboard ASUS 1500'] ],
[ 100000001, 1, 1, 2019, 'Ada', 'Centro', ['Monitor GPRS 3000',
'Motherboard ASUS 1500'] ],
[ 100000002, 2, 1, 2019, 'Grace', 'Caballito', ['Monitor ASC 543',
'Motherboard MZI', 'HDD Toyiva'] ],
[ 100000003, 10, 1, 2019, 'Ada', 'Centro', ['Monitor ASC 543',
'Motherboard ASUS 1200'] ],
[ 100000004, 12, 1, 2019, 'Grace', 'Caballito', ['Monitor GPRS 3000',
'Motherboard ASUS 1200'] ],
[ 100000005, 21, 3, 2019, 'Hedy', 'Caballito', ['Monitor ASC 543',
'Motherboard ASUS 1200', 'RAM Quinston'] ]
]
const precios = [
[ 'Monitor GPRS 3000', 200 ],
[ 'Motherboard ASUS 1500', 120 ],
[ 'Monitor ASC 543', 250 ],
[ 'Motherboard ASUS 1200', 100 ],
[ 'Motherboard MZI', 30 ],
[ 'HDD Toyiva', 90 ],
[ 'HDD Wezter Dishital', 75 ],
[ 'RAM Quinston', 110 ],
[ 'RAM Quinston Fury', 230 ]
];
const sucursales = ["Centro", "Caballito"];

//--- Función 1 ----
/*
Descripción: precioMaquina(componentes)​: recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.
*/

let suma = 0; // saqué suma para afuera para accederlo desde otras funciones
const precioMaquina = (listaComponentes) => { //como parametro va la variable donde está el array con una lista de componentes. Puede ser para calcular una máquina o el total de una venta
  let compEncontrado = false;  // inicializando flag
  // Recorriendo el array entregado y validando contra array precios
  listaComponentes.forEach(componente => {
    precios.forEach(producto =>{
      // Calcula el total de los componentes recibidos
      if (producto[0] === componente) {
          suma = suma + producto[1];
          compEncontrado = true;
        }
      });
    });
    if(!compEncontrado) throw new Error("No encontro el componente")
  return suma;
} 
// -----------------------------------------------------------------------


//--- Función 2 ----
/*
Descripción: cantidadVentasComponente(componente)​: recibe el nombre de un componente y devuelve la cantidad de veces que fue vendido. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ​ventas​.
*/

let cantComponente; // acá lo declaro pero lo llevo a cero solamente dentro de la función, al ejecutarla. De ese modo cantComponente está accesible desde todas las fucniones.
const cantidadVentasComponente = (componente) => {
  let cantComponente = 0;
  let compEncontrado = false; 
  // Recorriendo el array ventas y el inner array de componentes en cada venta
  ventas.forEach(row=>{
    row[6].forEach(col => {
      // Encontrar la n veces que se ha vendido x producto recorriendo la tabla ventas
      if (col === componente) {
          cantComponente++;
          compEncontrado = true;
      }
    }); 
  });
  if(!compEncontrado) throw new Error("No encontro el componente");
  //console.log(`Este componente se ha vendido: ${cantComponente} veces`); 
};
// -----------------------------------------------------------------------


//---- Función 3 ----- 
/* Descripción: Recibe el nombre de una vendedora y retorna el importe total de las ventas de esa vendedora.*/

let totalVentasVendedora = 0;
let listaCompVendidos = [];
const ventasVendedora = (nombre) => {
        ventas.forEach(venta => {
        if(venta[4] === nombre){
            listaCompVendidos.push(venta[6]);
        };
    });
        listaCompVendidos = listaCompVendidos.flat();
        precioMaquina(listaCompVendidos);
        totalVentasVendedora = suma; 
         //console.log(`El total de ventas de èsta vendedora es ${totalVentasVendedora}`);
        return totalVentasVendedora;
       
};
// -----------------------------------------------------------------------


// Función 4
/*
Descripción: componenteMasVendido()​: Devuelve el nombre del componente que más ventas tuvo históricamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente
*/

let masVendido;
const componenteMasVendido = () =>{
  
  let vecesVendido = 0;
  precios.forEach(componente =>{
    cantidadVentasComponente(componente[0]);
    if (cantComponente > vecesVendido) {
      masVendido = componente[0];
      vecesVendido = cantComponente;
    };
    
  });
  console.log(`El componente más vendido es ${masVendido}`);
  return masVendido;
};
// -----------------------------------------------------------------------


// Funcion 5 
/*
Descripción: ventasSucursal(sucursal)​: recibe por parámetro el nombre de una sucursal y retorna el importe de las ventas totales realizadas por una sucursal sin límite de fecha.
*/

 const ventasSucursal = sucursal => {
    let componentesVendidos = [];
    ventas.forEach(venta => {
      if(sucursal !== "Centro" && sucursal !== "Caballito") {
        throw new Error ("La sucursal ingresada no es correcta");
      } else if(venta[5] === sucursal) {
        componentesVendidos.push(venta[6]);
      }
    });
    componentesVendidos = componentesVendidos.flat();
    let total = precioMaquina(componentesVendidos);
    return total
  }
// ----------------------------------------------------------------------- 


//---Función 6 Mejor vendedora------
///------ Bueno este choclo funciona aunque no es muy elegante

let mejorVenta = 0;
let vendedoraMasExitosa = "";

const mejorVendedora = () => {
    let comparacionVendedoras = [];
    vendedoras.forEach(vendedora =>{
        ventasVendedora(vendedora);
        const nombre = vendedora;
        const ventasPersonales = [];
        ventasPersonales.push(nombre);
        ventasPersonales.push(totalVentasVendedora);
        comparacionVendedoras.push(ventasPersonales);        
  
    comparacionVendedoras.forEach(arrVendedora =>{
        if(arrVendedora[1] > mejorVenta){
            console.log(`Esta vendedora la rompe`);
            mejorVenta = arrVendedora[1];
            vendedoraMasExitosa = arrVendedora[0];
            //console.log(`La mejor vendedora fue ${vendedoraMasExitosa}`);
          return vendedoraMasExitosa;
        };
    });
});
};
// -----------------------------------------------------------------------


//---------Función 7 ------//
/*
Descripción: ventaPromedio()​: Debe retornar el importe promedio por venta, como un número entero sin decimales redondeado siempre para abajo.
*/

let promedioDeVentas = 0;
let totalVentas = 0;
let numeroDeComponentesVendidos = 0;
    
const ventaPromedio = () =>{
  
  ventas.forEach(venta =>{
    precioMaquina(venta[6]);
    totalVentas += suma;
    let numeroDeComponentes = venta[6].length;
    numeroDeComponentesVendidos += numeroDeComponentes;

  });
  
  promedioDeVentas = totalVentas / numeroDeComponentesVendidos;
  //console.log(`En promedio cada venta es de ${promedioDeVentas}`);
  return promedioDeVentas;
};

// -----------------------------------------------------------------------


//----------Funcion 8-----//
/*
Descripción: obtenerIdVenta()​: Tiene que retornar un número aleatorio entre 100000000 y 999999999
*/

const obtenerIdVenta = () => {
    const idRandom = Math.floor(Math.random() * Number(999999999 - 100000000) + 100000000);
    return idRandom;
};

// -----------------------------------------------------------------------

// ---- funcion 9  ---
/*9. agregarVenta(dia, mes, anio, vendedora, sucursal, componentes): 
* recibe por parámetro todos los datos de una venta,
* y los agrega en el array de ventas. Al igual que las ventas que ya están previamente creadas,
* además de estos datos necesitamos agregar el primer dato que es un identificador de la venta. Para agregar
este dato, tenemos que usar la función desarrollada en el punto anterior obtenerIdVenta*/

//Hice un choclo de validaciones para despues solo llamarlas en 'AgregarVenta', falta validar los componentes entrando en 'precios'

const validacionesAgregarVentas = (dia, mes, anio, vendedora, sucursal, componentes) => {
    if(dia !== Number && dia > 31) {
      throw new Error("El dia debe ser menor a 31 y de tipo Numero")
  } else if(mes !== Number && mes > 12) {
      throw new Error("El mes debe ser menor a 12 y de tipo Numero")
  } else if(anio !== Number && anio > 2020) {
      throw new Error("El anio ingresado no es valido o de tipo Numero")
  } else if (vendedoras.find((vendedora) => vendedora !== vendedora)) {
      throw new Error("El nombre de la vendedora es incorrecto")
  } else if (sucursal.find((sucursal) => sucursal !== sucursal)) {
    throw new Error("Pruebe con buscar la sucursal 'Centro o 'Caballito'")
  } 
}
  
  
////---
const validarComponentes = (componentes) => {
  let arrComponentes = [];
  arrComponentes.push(componentes);
  arrComponentes.forEach(componente => {
    if(!(precios.find(item => item[0]===componente))){
      throw new Error("Ingresó un componente inválido");
    };
  });
};
 
const agregarVenta = (dia, mes, anio, vendedora, sucursal, componentes) => {
  let id = (obtenerIdVenta());
  validarComponentes(componentes);
  validacionesAgregarVentas(dia, mes, anio, vendedora, sucursal, componentes);
  ventas.push([id, dia, mes, anio, vendedora, sucursal, [componentes]]);
  };



describe('Función 1', () => {
  test("Me da error si el componente ingresado no es correcto", () => {
    expect(() => precioMaquina(["Monitor ASC 545"])).toThrow("No encontro el componente");
  });
});

describe('Función 2', () => {
  test("Me da error si el componente ingresado no es correcto", () => {
    expect(() => cantidadVentasComponente(["Monitor ASC 545"])).toThrowError(/No encontro el componente/);
  });
});

describe('Función 3', () => {
  test("Me da error si no encuentra a la vendedora", () => {
    expect(() => ventasVendedora("Grsce")).toThrowError(/No se ha encontrado el nombre de la vendedora/)
  });
});

describe("Función 4- ComponenteMasVendido", () =>{
  ventas = [
[ 100000000, 4, 2, 2019, 'Grace', 'Centro', ['Monitor GPRS 3000',
'Motherboard ASUS 1500'] ],
[ 100000001, 1, 1, 2019, 'Ada', 'Centro', ['Monitor GPRS 3000',
'Motherboard ASUS 1500'] ],
[ 100000002, 2, 1, 2019, 'Grace', 'Caballito', ['Monitor ASC 543',
'Motherboard MZI', 'HDD Toyiva'] ],
[ 100000003, 10, 1, 2019, 'Ada', 'Centro', ['Monitor ASC 543',
'Motherboard ASUS 1200'] ],
[ 100000004, 12, 1, 2019, 'Grace', 'Caballito', ['Monitor GPRS 3000',
'Motherboard ASUS 1200'] ],
[ 100000005, 21, 3, 2019, 'Hedy', 'Caballito', ['Monitor ASC 543',
'Motherboard ASUS 1200', 'RAM Quinston'] ]
];
  test("En este grupo de ventas el componente más vendido será Monitor GPRS 3000", () => {
       expect(masVendido).toBe("Monitor GPRS 3000");
       });
});

describe('Función 5', () => {
  test("Me da error si la sucursal no coincide con centro o caballito", () => {
    expect(() => ventasSucursal("Flores")).toThrow("La sucursal ingresada no es correcta");
  });
});

describe('Función 8', () => {
  test("Espera a que el numero obtenido sea menor a 999999999", () => {
    expect(obtenerIdVenta()).toBeLessThan(999999999);
  });

  test("Espera a que el numero obtenido sea mayor a 100000000", () => {
    expect(obtenerIdVenta()).toBeGreaterThan(100000000);
  });
});


describe('Funcion 9', () => {
  test("Testea que dia sea menor a 31", () => {
    expect(() => validacionesAgregarVentas(33, 12, 2020, "Grace", "Centro", "Monitor GPRS 3000")).toThrow("El dia debe ser menor a 31 y de tipo Numero");
    });
  test("Testea que el mes sea menor a 12", () => {
    expect(() => validacionesAgregarVentas(28, 13, 2020, "Grace", "Centro", "Monitor GPRS 3000")).toThrow("El mes debe ser menor a 12 y de tipo Numero");
    });
  test("Testea que el año sea menor a 2020", () => {
    expect(() => validacionesAgregarVentas(28, 12, 2021, "Grace", "Centro", "Monitor GPRS 3000")).toThrow("El anio ingresado no es valido o de tipo Numero");
    });
  test("Testea que el nombre de la vendedora es correcto", () => {
    expect(() => validacionesAgregarVentas(28, 12, 2020, "Grsce", "Centro", "Monitor GPRS 3000")).toThrow("El nombre de la vendedora es incorrecto");
    });
  test("Testea que el componente ingresado exista", () => {
    expect(() => validarComponentes("Monitor GPRS 30")).toThrow("Ingresó un componente inválido");
    });
  test("Testea que la sucursal ingresada sea válida", () => {
    expect(() => validacionesAgregarVentas(28, 12, 2020, "Grace", "Centrx", "Monitor GPRS 3000")).toThrow("El nombre de la sucursal es incorrecto"); 
    });
});  