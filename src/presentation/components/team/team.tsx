import { useState } from "react";
import { TeamDatas } from "../../../domain/config/team-config";
import { TeamCard } from "../team-card/team-card";
import { useTranslation } from "react-i18next";

export function TeamComponent() {
  const { t } = useTranslation();
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    setActiveCardId(id === activeCardId ? null : id);
  };

  return (
    <section
      id="team"
      className="2xl:py-[7rem] py-[5rem] 2xl:mt-[10rem] mt-[5rem] bg-team"
    >
      <center>
        <h1
          className="text-4xl font-bold text-white glitch 2xl:text-6xl hacker sm:text-5xl"
          data-text={t("teamComponent.title")}
        >
          {t("teamComponent.title")}
        </h1>
      </center>
      <br />
      <br />
      <div className="container">
        <div className="grid gap-8 2xl:gap-3 md:grid-cols-3 2xl:grid-cols-6">
          {TeamDatas.map((user) => (
            <TeamCard
              key={user.id}
              datas={user}
              isActive={user.id === activeCardId}
              onClick={() => handleCardClick(user.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
