import { IBenefits } from "../../interfaces/benefits/benefits";
import { icons } from "../../utils/image-exporter";
import { useTranslation } from 'react-i18next'; // Importe useTranslation aqui

export const BenefitsData: IBenefits[] = [
  {
    id: 1,
    icon: icons.check_list,
    content: "securityTrainingExpert",
  },
  {
    id: 2,
    icon: icons.check_list,
    content: "directApplicationLabs",
  },
  {
    id: 3,
    icon: icons.check_list,
    content: "freeCTFs",
  },
  {
    id: 4,
    icon: icons.check_list,
    content: "regularUpdates",
  },
  {
    id: 4,
    icon: icons.check_list,
    content: "regularUpdates",
  },
];

export const getTranslatedBenefitsData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation(); // Mova useTranslation para dentro da função
  return BenefitsData.map(benefit => ({
    ...benefit,
    content: t(`benefits.${benefit.content}`)
  }));
};
