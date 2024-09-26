import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { fetchCreators } from '../../services/creatorService'; // Firestore에서 크리에이터 정보 가져오기
import './CreatorListPage.style.css';

// 3D 모델 컴포넌트
const CreatorModel = ({ modelPath, position, rotation, onClick, isSelected }) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  // 부드럽게 떠다니는 애니메이션 적용
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (ref.current && !isSelected && position) { // position이 존재하는지 확인
      ref.current.position.y = position[1] + Math.sin(elapsedTime) * 0.5;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={position ? (isSelected ? [0, 0, 0] : position) : [0, 0, 0]} // position 값이 있는지 확인 후 설정
      rotation={rotation}
      scale={isSelected ? 1 : 0.5} // 선택된 모델은 크게 확장
      onClick={(e) => {
        e.stopPropagation(); // 클릭 이벤트 전파 방지
        onClick(); // 모델 클릭 시 선택 처리
      }}
    />
  );
};

// 카메라 제어 로직을 추가하는 컴포넌트
const CameraController = ({ selectedCreator }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (selectedCreator && selectedCreator.position) { // position이 있는지 확인
      camera.position.set(
        selectedCreator.position[0] ?? 0, // undefined 방지
        selectedCreator.position[1] + 1 ?? 1,
        selectedCreator.position[2] + 5 ?? 5
      );
      camera.lookAt(
        selectedCreator.position[0] ?? 0,
        selectedCreator.position[1] ?? 0,
        selectedCreator.position[2] ?? 0
      );
    }
  }, [selectedCreator, camera]);

  return null;
};

const CreatorListPage = () => {
  const [creators, setCreators] = useState([]); // 크리에이터 목록 상태
  const [selectedCreator, setSelectedCreator] = useState(null); // 선택된 크리에이터 상태

  // Firestore에서 크리에이터 데이터 불러오기
  useEffect(() => {
    const loadCreators = async () => {
      const creatorsData = await fetchCreators(); // Firebase에서 데이터 불러오기
      setCreators(creatorsData); // 불러온 데이터를 상태에 저장
    };

    loadCreators(); // 데이터 로드
  }, []);

  // 각 크리에이터의 position을 계산하여 설정
  const calculatePosition = (index) => {
    const numColumns = 5; // 5열
    const numRows = 4; // 4행

    const x = (index % numColumns) * 2 - (numColumns * 2) / 2; // 열 기준으로 x 좌표 설정
    const z = Math.floor(index / numColumns) * 2 - (numRows * 2) / 2; // 행 기준으로 z 좌표 설정
    const y = 0; // y 좌표는 모두 0으로 설정

    return [x, y, z];
  };

  const handleModelClick = (creator) => {
    setSelectedCreator(creator); // 선택된 크리에이터 설정
  };

  const handlePointerMissed = () => {
    setSelectedCreator(null); // 빈 공간 클릭 시 선택 해제
  };

  return (
    <div className="h-full w-screen gradient-background flex">
      {/* 왼쪽: 3D 모델 영역 */}
      <div className={selectedCreator ? 'w-1/2' : 'w-full'}>
        <Canvas onPointerMissed={handlePointerMissed}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 5, 2]} />
          <Environment preset="sunset" />
          <OrbitControls enableZoom={true} />

          {/* 카메라 제어 */}
          <CameraController selectedCreator={selectedCreator} />

          {/* Firestore에서 불러온 크리에이터 데이터를 3D 모델로 렌더링 */}
          {creators.map((creator, index) => (
            selectedCreator && selectedCreator.id !== creator.id ? null : (
              <CreatorModel
                key={creator.id}
                modelPath={`/assets/3dmodel/${creator.modelPath}`}
                position={calculatePosition(index)} // 순서에 따른 위치 계산
                rotation={[0, Math.random() * Math.PI * 2, 0]} // 랜덤 회전
                isSelected={selectedCreator && selectedCreator.id === creator.id}
                onClick={() => handleModelClick(creator)}
              />
            )
          ))}
        </Canvas>
      </div>

      {/* 오른쪽: 크리에이터 정보 영역 */}
      {selectedCreator && (
        <div className="w-1/2 p-8" onClick={(e) => e.stopPropagation()}>
          <div className="creator-info">
            <h2 className="text-2xl font-bold">{selectedCreator.name}</h2>
            <p>{selectedCreator.details}</p>
            {/* 추가적인 정보와 SNS 링크 등을 여기에 추가 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorListPage;
