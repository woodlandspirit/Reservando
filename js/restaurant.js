function sumatoria(numeros){
    let sumatoria = numeros.reduce(function (valorAcumulado, valorActual) {
        return valorAcumulado + valorActual;
    }, 0)
    return sumatoria;
}

function promedio(arr){
    let promedio = sumatoria(arr) / arr.length;
    return Math.round(promedio * 10) / 10;
}

var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    this.horarios = this.horarios.filter(function(horario){
         return horario !== horarioReservado;
    });
    
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }
}