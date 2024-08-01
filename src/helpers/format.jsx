import { Timestamp  } from 'firebase/firestore';

export const formatCurrencyNumber = (num) => {
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        minimumFractionDigits: 1,
        maximumFractionDigits: 1 
    }).format(num);
}


export const formatDate = ({seconds, nanoseconds }) => {
    const firebaseTimestamp = new Timestamp(seconds, nanoseconds);
    const date = firebaseTimestamp.toDate(); // Convertir el Timestamp a un objeto Date de JavaScript
    
    // Obtener el día, mes y año
    const day = formatNumber(date.getDate()); 
    const month = formatNumber(date.getMonth() + 1); // Los meses en JavaScript son 0-indexados, así que agregamos 1
    const year = date.getFullYear();
    const hour = formatNumber(date.getHours());
    const min = formatNumber(date.getMinutes());
    const secs = formatNumber(date.getSeconds());
    
    // Formatear la fecha en dd/mm/yyyy
    return `${day}/${month}/${year} ${hour}:${min}:${secs}`;
  };

export const formatNumber = (number) => {
    return number.toString().padStart(2, '0');  // Agregar un cero delante si el número es menor a 10
  }