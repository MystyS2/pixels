import React, { useState, useEffect } from "react";
import { Input, Button, Card } from "@nextui-org/react"; // NextUI 컴포넌트
import {
  addCreator,
  updateCreator,
  deleteCreator,
  fetchCreators,
} from "../services/creatorService";

const AdminPage = () => {
  const [creators, setCreators] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [selectedCreator, setSelectedCreator] = useState(null);

  useEffect(() => {
    fetchCreators().then((creatorsData) => {
      setCreators(creatorsData);
    });
  }, []);

  const handleSave = async () => {
    const newCreator = {
      name,
      description,
      socials: {
        twitter,
        instagram,
      },
    };

    if (selectedCreator) {
      await updateCreator(selectedCreator.id, newCreator);
      alert("크리에이터 정보가 수정되었습니다.");
    } else {
      await addCreator(newCreator);
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
    setName(creator.name);
    setDescription(creator.description);
    setTwitter(creator.socials.twitter);
    setInstagram(creator.socials.instagram);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setTwitter("");
    setInstagram("");
    setSelectedCreator(null);
  };

  return (
    <div className="p-8 bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">크리에이터 추가 및 수정</h1>

      <Card className="mb-8 p-6" shadow={false} bordered>
        <h2 className="text-xl font-bold mb-4">{selectedCreator ? "크리에이터 수정" : "크리에이터 추가"}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            label="이름"
            placeholder="크리에이터 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            clearable
            bordered
          />
          <Input
            label="설명"
            placeholder="크리에이터 설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            clearable
            bordered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Input
            label="Twitter"
            placeholder="Twitter URL 입력"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            clearable
            bordered
          />
          <Input
            label="Instagram"
            placeholder="Instagram URL 입력"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
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
          <div key={creator.id} className="bg-[#18181B] shadow-lg rounded-lg p-4">
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
