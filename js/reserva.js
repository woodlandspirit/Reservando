let Reserva = function(horario, cantidadPersonas, precioPersona, codigoDescuento) {
    this.horario = horario;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento;
}

Reserva.prototype.calcularPrecioBase = function() {
    return this.precioPersona * this.cantidadPersonas;
}

Reserva.prototype.calcularPrecioFinal = function() {
    let precioBase = this.calcularPrecioBase();
    let adicionales = this.calcularAdicionales(precioBase);
    let descuentos = this.calcularDescuentos(precioBase);
    return  precioBase + adicionales - descuentos;
}

// adicionales
Reserva.prototype.adicionalFinDeSemana = function(precioBase) {
    let diaSemana = this.horario.getDay();
    if (diaSemana === 0 || diaSemana === 5 || diaSemana === 6){
        return precioBase * 0.1;
    };
    return 0;
}

Reserva.prototype.adicionalHoraPico = function(precioBase) {
    let horarioDeReserva = (this.horario.getHours() * 60) + this.horario.getMinutes();
    if ((horarioDeReserva >= 780 && horarioDeReserva < 840) || (horarioDeReserva >= 1200 && horarioDeReserva < 1260)){
        return precioBase * 0.05;
    };
    return 0;
}

Reserva.prototype.calcularAdicionales = function(precioBase) {
    return this.adicionalFinDeSemana(precioBase) + this.adicionalHoraPico(precioBase);
}

// descuentos
Reserva.prototype.descuentosGrupo = function(precioBase) {
    let descuentoPorGrupo = 0;

    if (this.cantidadPersonas >= 4 && this.cantidadPersonas <= 6){
        descuentoPorGrupo = precioBase * 0.05;
    } else if (this.cantidadPersonas === 7 || this.cantidadPersonas === 8) {
        descuentoPorGrupo = precioBase * 0.1;
    } else if (this.cantidadPersonas > 8){
        descuentoPorGrupo = precioBase * 0.15;
    }

    return descuentoPorGrupo;
}

Reserva.prototype.descuentosCodigo = function(precioBase) {
    let descuentoPorCodigo = 0;

    if (this.codigoDescuento === 'DES15'){
        descuentoPorCodigo = precioBase * 0.15;
    } else if (this.codigoDescuento === 'DES200') {
        descuentoPorCodigo = 200;
    } else if (this.codigoDescuento === 'DES1'){
        descuentoPorCodigo = this.precioPersona;
    }
    return descuentoPorCodigo;
}

// Al no especificar que los descuentos deben se acumulativos, opté por establecer que,
// en caso de tener descuentoPorGrupo y descuentoPorCodigo, calcularDescuentos elija el mayor por asignación desestructurante.
Reserva.prototype.calcularDescuentos = function(precioBase) {
    let descuentos = [ this.descuentosGrupo(precioBase), this.descuentosCodigo(precioBase) ];
    return Math.max(...descuentos);
}