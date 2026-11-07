/* Mis fallos compartidos por los tests de la academia, Preguntados y Kahoot.
   El identificador de pregunta es el original del banco (tema:índice), no la opción mezclada del juego. */
const savedEvents=new Set();
const pendingEvents=new Set();
export async function recordGameMistake(client,user,questionKey,eventKey){
 if(!client||!user?.id||typeof questionKey!=='string')return false;
 const pos=questionKey.lastIndexOf(':');
 if(pos<1)return false;
 const lesson=questionKey.slice(0,pos),index=Number(questionKey.slice(pos+1));
 if(!Number.isSafeInteger(index)||index<0||!lesson)return false;
 const event=String(eventKey||questionKey);
 const id=user.id+'|'+event;
 if(savedEvents.has(id)||pendingEvents.has(id))return true;
 pendingEvents.add(id);
 try{
  const {error}=await client.from('mistakes').upsert(
   {user_id:user.id,question_id:questionKey,lesson_id:lesson,question_index:index},
   {onConflict:'user_id,question_id'}
  );
  if(error)throw error;
  savedEvents.add(id);
  return true;
 }catch(e){
  console.warn('No se pudo sincronizar este fallo con Mis fallos:',e);
  return false;
 }finally{pendingEvents.delete(id);}
}
