import { getFirestore, collection, addDoc, getDocs, Timestamp, query, where, doc, deleteDoc  } from 'firebase/firestore';
import { app } from "../firebase/config-firebase"
import { setDelete, setAdd, setList } from '../redux/slices/nominaSlices';
import { formatDate } from '../helpers/format';
const db = getFirestore(app);

export const crear = (uid, data) => async (dispatch) => {
    try{
        const docRef = await addDoc(
                            collection(db, `${uid}/nominas/pagos`),
                            data
        )
        console.log('Colección creada: ',docRef)
        
        // Convertir la fecha a un objeto Timestamp de Firebase
        const timestamp = Timestamp.fromDate(data.fecha);

        // Obtener el objeto JSON con seconds y nanoseconds
        const jsonTimestamp = {
          seconds: timestamp.seconds,
          nanoseconds: timestamp.nanoseconds
        };

        data.id = docRef.id
        data.fecha = formatDate(jsonTimestamp)
        
        dispatch(setAdd(data));
        //dispatch(getDataByUid(uid))
    }catch(err){
        console.log('Error al crear la colección: ',err)
    }
}

export const getDataByUid = (uid) => async (dispatch) => {
    try {
      // Crear una referencia a la colección
      const colRef = collection(db, `${uid}/nominas/pagos`);

    // Obtener todos los documentos de la colección
    const querySnapshot = await getDocs(colRef);

    // Procesar los documentos obtenidos
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      fecha: formatDate(doc.data().fecha),
      horas: doc.data().horas,
      valor_hora: doc.data().valor_hora
    }));
  
      // Mostrar los documentos en consola (o procesarlos según tu necesidad)
      console.log('getDataById: ',documents);
      dispatch(setList({list:documents}))
      
    } catch (e) {
      console.error("Error getting documents: ", e);
      dispatch(setList([]))
    }
  };

export const deleteItem = (uid) => (dispatch) => {
  try{
    deletFromFirebase(uid)
    dispatch(setDelete(uid))
  }catch(err){
    console.log('Error al eliminar la colección: ',err)
  }
}

const deletFromFirebase = async (uid) => {
  const collectionName = `${uid}/nominas/pagos`
  // Crear una consulta para encontrar el documento
  const q = query(collection(db, collectionName), where(uid, "==", uid));

  // Ejecutar la consulta
  const querySnapshot = await getDocs(q);

  // Recorrer los resultados de la consulta y eliminar los documentos encontrados
  querySnapshot.forEach(async (document) => {
    const docRef = doc(db, collectionName, document.id);
    await deleteDoc(docRef);
    console.log(`Documento con ID ${document.id} eliminado.`);
  });

  if (querySnapshot.empty) {
    console.log('No se encontraron documentos con el valor especificado.');
  }
}
