import { ITrainer } from "../../../interfaces/trainer/trainer";


export function TeacherAvatarComponent({ name, picture, role }: ITrainer) {
  return (
    <div className="flex gap-2 mt-4 dark:text-white">
      <img src={picture} alt={'Trainer ' + name + 'profile photo'} className="2xl:w-[3em] 2xl:h-[3em] rounded-full border border-primary my-auto w-[2em] h-[2em]" />
      <div className="flex flex-col my-auto">
        <span className="text-sm font-semibold 2xl:text-m">{name}</span>
        <span className="text-xs 2xl:text-sm hacker">{role}</span>
      </div>
    </div>
  );
}
