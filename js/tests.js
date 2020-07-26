let expect = chai.expect;

describe('Testings de Restaurant & Listado', () => {
    describe('reservarHorario(horario)', () => {
        let restaurant;
        beforeEach( () => {
            restaurant = new Restaurant(8, "Cafe Francoeur", "Desayuno", "París", ["14:30", "15:30", "19:00"], "../img/desayuno1.jpg", [4, 7, 9, 8, 10]);
        })
        it('Eliminación de la disponibilidad del horario una vez reservado.', () => {
            restaurant.reservarHorario('15:30');
            expect(restaurant.horarios).to.eql(['14:30', '19:00']);
            expect(restaurant.horarios.length).to.equal(2);
        })
        it('Al reservar un horario inválido, el array de horarios no es modificado de ninguna forma.', () => {
            restaurant.reservarHorario('16:00');
            expect(restaurant.horarios).to.eql(["14:30", "15:30", "19:00"]);
            expect(restaurant.horarios.length).to.equal(3);
        })
        it('Al intentar reservar sin un horario como parámetro, el array de horarios no es modificado de ninguna forma.', () => {
            restaurant.reservarHorario();
            expect(restaurant.horarios).to.eql(["14:30", "15:30", "19:00"]);
            expect(restaurant.horarios.length).to.equal(3);
        })
    })
    describe('obtenerPuntuacion()', () => {
        let restaurant;
        beforeEach( () => {
            restaurant = new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [4, 9, 10, 9, 4, 6]);
        })
        it('El promedio de las calificaciones del restaurante se calcula correctamente.', () =>{
            let puntuacion = restaurant.obtenerPuntuacion();
            expect(puntuacion).to.equal(7);
        })
        it('Si un restaurante no posee calificaciones, entonces su puntuación será igual a 0.', () => {
            restaurant.calificaciones = [];
            let puntuacion = restaurant.obtenerPuntuacion();
            expect(puntuacion).to.equal(0);
        })
    })
    describe('calificar()', () => {
        let restaurant;
        beforeEach( () => {
            restaurant = new Restaurant(4, "Bleecker Street Pizza", "Pizza", "Nueva York", ["12:00", "15:00", "17:30"], "../img/pizza2.jpg", [8, 9, 9, 4, 6, 7]);
        })
        it('Verificación de que no se puedan ingresar números menores o iguales a 0.', () => {
            restaurant.calificar(0);
            expect(restaurant.calificaciones.length).to.equal(6);
            restaurant.calificar(-5);
            expect(restaurant.calificaciones.length).to.equal(6);
        })
        it('Verificación de que no se puedan ingresar números mayores a 9.', () => {
            restaurant.calificar(10);
            expect(restaurant.calificaciones.length).to.equal(6);
        })
        it('Verificación de que al ingresar un valor válido, se añada al array de calificaciones.', () => {
            restaurant.calificar(5);
            restaurant.calificar(9)
            expect(restaurant.calificaciones).to.eql([8, 9, 9, 4, 6, 7, 5, 9]);
        })
        it('Verificación de que no se pueden ingresar valores no numéricos.', () => {
            restaurant.calificar('8 ');
            restaurant.calificar('ocho');
            expect(restaurant.calificaciones.length).to.equal(6);
        })
        it('Verificación de que no se pueden ingresar valores no enteros.', () => {
            restaurant.calificar(4.5);
            expect(restaurant.calificaciones.length).to.equal(6);
        })
    })
    describe('buscarRestaurante(id)', () => {
        let listado;
        beforeEach( () => {
            listado = new Listado(listadoDeRestaurantes);
        })
        it('La búsqueda por ID válido funciona correctamente.', () => {
            let resultadoBusqueda = new Restaurant(10, "New London Cafe", "Desayuno", "Londres", ["12:00", "13:00", "14:30"], "../img/desayuno3.jpg", [9, 4, 6, 5, 6]);
            expect(listado.buscarRestaurante(10)).to.eql(resultadoBusqueda);
        })
        it('La búsqueda por ID no perteneciente al array devuelve el mensaje esperado.', () => {
            expect(listado.buscarRestaurante(27)).to.equal('No se ha encontrado ningún restaurant');
        })
        it('La búsqueda sin parámetro devuelve el mensaje esperado.', () => {
            expect(listado.buscarRestaurante()).to.equal('No se ha encontrado ningún restaurant');
        })
    })
    describe('obtenerRestaurantes()', () => {
        let listado;
        beforeEach( () => {
            listado = new Listado(listadoDeRestaurantes);
        })
        it('La búsqueda con los tres filtros funciona correctamente.', () => {
            let filtrado = listado.obtenerRestaurantes('Desayuno', 'París', '19:00');
            expect(filtrado[0].nombre).to.equal('Cafe Francoeur');
            expect(filtrado[1].nombre).to.equal('Les Deux Magots');
        })
        it('La búsqueda por rubro funciona correctamente.', () => {
            let filtrado = listado.obtenerRestaurantes('Pasta', null, null);
            expect(filtrado.length).to.equal(5);
        })
        it('La búsqueda por ciudad funciona correctamente.', () => {
            let filtrado = listado.obtenerRestaurantes(null, 'Roma', null);
            expect(filtrado.length).to.equal(2);
        })
        it('La búsqueda por horario funciona correctamente.', () => {
            let filtrado = listado.obtenerRestaurantes(null, null, '15:30');
            expect(filtrado.length).to.equal(4);
        })
        it('La búsqueda sin parámetros debe mostrar todos los restaurantes.', () => {
            let filtrado = listado.obtenerRestaurantes(null, null, null);
            expect(filtrado.length).to.equal(24);
        })
    })
})

describe('Testings del constructor Reserva', () => {
    let listaDeReservas, reserva1, reserva2, reserva3, reserva4, reserva5, reserva6,
    reserva7, reserva8, reserva9, reserva10, reserva11, reserva12, reserva13, reserva14,
    reserva15, reserva16, reserva17, reserva18, reserva19, reserva20, reserva21;

    beforeEach( () => {
        listaDeReservas = [];
        reserva1 = new Reserva(new Date (2020, 9, 22, 15, 30), 2, 335, '');
        reserva2 = new Reserva(new Date (2020, 9, 22, 15, 30), 4, 335, '');
        reserva3 = new Reserva(new Date (2020, 9, 22, 15, 30), 5, 335, '');
        reserva4 = new Reserva(new Date (2020, 9, 22, 15, 30), 6, 335, '');
        reserva5 = new Reserva(new Date (2020, 9, 22, 15, 30), 7, 335, '');
        reserva6 = new Reserva(new Date (2020, 9, 22, 15, 30), 8, 335, '');
        reserva7 = new Reserva(new Date (2020, 9, 22, 15, 30), 9, 335, '');
        reserva8 = new Reserva(new Date (2020, 9, 22, 15, 30), 2, 335, 'DES15');
        reserva9 = new Reserva(new Date (2020, 9, 22, 15, 30), 2, 335, 'DES200');
        reserva10 = new Reserva(new Date (2020, 9, 22, 15, 30), 2, 335, 'DES1');
        reserva11 = new Reserva(new Date (2020, 9, 22, 13, 00), 2, 335, '');
        reserva12 = new Reserva(new Date (2020, 9, 22, 13, 30), 2, 335, '');
        reserva13 = new Reserva(new Date (2020, 9, 22, 14, 00), 2, 335, '');
        reserva14 = new Reserva(new Date (2020, 9, 22, 20, 00), 2, 335, '');
        reserva15 = new Reserva(new Date (2020, 9, 22, 21, 00), 2, 335, '');
        reserva16 = new Reserva(new Date (2020, 9, 23, 15, 30), 2, 335, '');
        reserva17 = new Reserva(new Date (2020, 9, 24, 15, 30), 2, 335, '');
        reserva18 = new Reserva(new Date (2020, 9, 25, 15, 30), 2, 335, '');
        reserva19 = new Reserva(new Date (2020, 9, 24, 20, 30), 2, 335, 'DES1');
        reserva20 = new Reserva(new Date (2020, 9, 22, 15, 30), 8, 335, 'DES1');

        listaDeReservas.push(reserva1, reserva2, reserva3, reserva4, reserva5,
        reserva6, reserva7, reserva8, reserva9, reserva10, reserva11, reserva12,
        reserva13, reserva14, reserva15, reserva16, reserva17, reserva18, reserva19,
        reserva20);
    })

    describe('calcularPrecioBase()', () => {
        it('Base 2 personas', () => {
            expect(reserva1.calcularPrecioBase()).to.equal(670);
        })
        it('Base 4 personas', () => {
            expect(reserva2.calcularPrecioBase()).to.equal(1340);
        })
        it('Base 5 personas', () => {
            expect(reserva3.calcularPrecioBase()).to.equal(1675);
        })
        it('Base 6 personas', () => {
            expect(reserva4.calcularPrecioBase()).to.equal(2010);
        })
        it('Base 7 personas', () => {
            expect(reserva5.calcularPrecioBase()).to.equal(2345);
        })
        it('Base 8 personas', () => {
            expect(reserva6.calcularPrecioBase()).to.equal(2680);
        })
        it('Base 9 personas', () => {
            expect(reserva7.calcularPrecioBase()).to.equal(3015);
        })
    })

    describe('calcularPrecioFinal()', () => {
        it('2 personas, día y hora normal, sin descuentos', () => {
            expect(reserva1.calcularPrecioFinal()).to.equal(670);
        })
        it('2 personas, día y hora normal, DES15', () => {
            expect(reserva8.calcularPrecioFinal()).to.equal(569.5);
        })
        it('2 personas, día y hora normal, DES200', () => {
            expect(reserva9.calcularPrecioFinal()).to.equal(470);
        })
        it('2 personas, día y hora normal, DES1', () => {
            expect(reserva10.calcularPrecioFinal()).to.equal(335);
        })
        it('2 personas, día normal y hora pico.', () => {
            expect(reserva11.calcularPrecioFinal()).to.equal(703.5);
            expect(reserva12.calcularPrecioFinal()).to.equal(703.5);
            expect(reserva14.calcularPrecioFinal()).to.equal(703.5);
        })
        it('2 personas, día normal y límite de hora pico.', () => {
            expect(reserva13.calcularPrecioFinal()).to.equal(670);
            expect(reserva15.calcularPrecioFinal()).to.equal(670);
        })
        it('2 personas, Viernes, Sábado y Domingo en hora normal.', () => {
            expect(reserva16.calcularPrecioFinal()).to.equal(737);
            expect(reserva17.calcularPrecioFinal()).to.equal(737);
            expect(reserva18.calcularPrecioFinal()).to.equal(737);
        })
        it('2 personas, dos adicionales, DES1', () => {
            expect(reserva19.calcularPrecioFinal()).to.equal(435.5);
        })
        it('Día y hora normal, teniendo acceso a dos descuentos se elige el de mayor monto', () => {
            expect(reserva20.calcularPrecioFinal()).to.equal(2345);
        })
    })
})