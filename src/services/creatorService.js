import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Firestore 초기화 파일 가져오기

// 크리에이터 추가
export const addCreator = async (newCreator) => {
  try {
    const docRef = await addDoc(collection(db, 'creators'), newCreator);
    return docRef.id; // 새로 추가된 문서 ID 반환
  } catch (error) {
    console.error('크리에이터 추가 중 오류 발생: ', error);
    throw error;
  }
};

// 크리에이터 업데이트
export const updateCreator = async (id, updatedData) => {
  const creatorRef = doc(db, 'creators', id);  // 업데이트할 문서 참조
  try {
    await updateDoc(creatorRef, updatedData);
  } catch (error) {
    console.error('크리에이터 정보 업데이트 실패: ', error);
    throw error;
  }
};

// 크리에이터 삭제
export const deleteCreator = async (id) => {
  const creatorRef = doc(db, 'creators', id);  // 삭제할 문서 참조
  try {
    await deleteDoc(creatorRef);
  } catch (error) {
    console.error('크리에이터 삭제 실패: ', error);
    throw error;
  }
};

// 크리에이터 목록 가져오기
export const fetchCreators = async () => {
  const querySnapshot = await getDocs(collection(db, 'creators'));
  const creators = [];
  querySnapshot.forEach((doc) => {
    creators.push({ id: doc.id, ...doc.data() });
  });
  return creators;
};
