import React, { useState, useEffect } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import {
  addCreator,
  updateCreator,
  deleteCreator,
  fetchCreators,
} from "../services/creatorService";

const AdminPage = () => {
  const [creators, setCreators] = useState([]);
  const [creatorData, setCreatorData] = useState({
    name: "",
    birthday: "",
    youtube: "",
    chzzk: "",
    africatv: "",
    twitter: "",
    instagram: "",
    cafe: "",
    modelPath: "",
  });
  const [selectedCreator, setSelectedCreator] = useState(null);

  useEffect(() => {
    fetchCreators().then((creatorsData) => {
      setCreators(creatorsData);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreatorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (selectedCreator) {
      await updateCreator(selectedCreator.id, creatorData);
      alert("크리에이터 정보가 수정되었습니다.");
    } else {
      await addCreator(creatorData);
      alert("새 크리에이터가 추가되었습니다.");
    }

    resetForm();
    fetchCreators().then((creatorsData) => {
      setCreators(creatorsData);
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      await deleteCreator(id);
      alert("크리에이터가 삭제되었습니다.");
      fetchCreators().then((creatorsData) => {
        setCreators(creatorsData);
      });
    }
  };

  const handleEdit = (creator) => {
    setSelectedCreator(creator);

    // creatorData의 구조에 맞게 필드 할당
    setCreatorData({
      name: creator.name,
      birthday: creator.birthday,
      youtube: creator.platforms.youtube,
      chzzk: creator.platforms.chzzk,
      africatv: creator.platforms.africatv,
      twitter: creator.socials.twitter,
      instagram: creator.socials.instagram,
      cafe: creator.socials.cafe,
      modelPath: creator.modelPath
    });
  };

  const resetForm = () => {
    setCreatorData({
      name: "",
      birthday: "",
      youtube: "",
      chzzk: "",
      africatv: "",
      twitter: "",
      instagram: "",
      cafe: "",
      modelPath: ""
    });
    setSelectedCreator(null);
  };

  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">크리에이터 추가 및 수정</h1>

      <Card className="mb-8 p-6" shadow={false} bordered>
        <h2 className="text-xl font-bold mb-4">
          {selectedCreator ? "크리에이터 수정" : "크리에이터 추가"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            label="이름"
            placeholder="크리에이터 이름을 입력하세요"
            name="name"
            value={creatorData.name}
            onChange={handleInputChange}
            clearable
            bordered
          />
          <Input
            label="유튜브"
            placeholder="유튜브 링크"
            name="youtube"
            value={creatorData.youtube}
            onChange={handleInputChange}
            clearable
            bordered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            label="치지직"
            placeholder="치지직 링크"
            name="chzzk"
            value={creatorData.chzzk}
            onChange={handleInputChange}
            clearable
            bordered
          />
          <Input
            label="아프리카tv"
            placeholder="아프리카 링크"
            name="africatv"
            value={creatorData.africatv}
            onChange={handleInputChange}
            clearable
            bordered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            label="생일"
            placeholder="생일"
            name="birthday"
            value={creatorData.birthday}
            onChange={handleInputChange}
            clearable
            bordered
          />
          <Input
            label="Instagram"
            placeholder="Instagram URL 입력"
            name="instagram"
            value={creatorData.instagram}
            onChange={handleInputChange}
            clearable
            bordered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            label="팬카페"
            placeholder="팬카페 링크"
            name="cafe"
            value={creatorData.cafe}
            onChange={handleInputChange}
            clearable
            bordered
          />
          <Input
            label="3d 모델 파일명"
            placeholder="3d 모델 경로"
            name="modelPath"
            value={creatorData.modelPath}
            onChange={handleInputChange}
            clearable
            bordered
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={handleSave}>
            {selectedCreator ? "수정 완료" : "크리에이터 추가"}
          </Button>
          {selectedCreator && (
            <Button flat color="error" onClick={resetForm}>
              취소
            </Button>
          )}
        </div>
      </Card>

      <h1 className="text-3xl font-bold mb-6">크리에이터 목록</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="bg-[#18181B] shadow-lg rounded-lg p-4"
          >
            <h3 className="font-semibold">{creator.name}</h3>
            <p>{creator.description}</p>
            <div className="flex justify-between mt-4">
              <Button size="sm" onClick={() => handleEdit(creator)}>
                수정
              </Button>
              <Button
                flat
                color="error"
                size="sm"
                onClick={() => handleDelete(creator.id)}
              >
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
