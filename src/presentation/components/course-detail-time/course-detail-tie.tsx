export interface ITimendStudents {
  timeIcon: string;
  studentsIcon: string;
  hours: number;
  students: number;
  className?: string
}

export function CourseDetailsTime({
  timeIcon,
  studentsIcon,
  hours,
  students,
  className,
}: ITimendStudents) {
  return (
    <div className={`flex dark:text-white my-auto lg:flex-row sm:flex-col xl:gap-2 ${className}`}>
      <span className="flex gap-2 text-sm font-semibold 2xl:text-md">
        <img src={timeIcon} className="w-[1em] h-[1em] my-auto" alt="" />
        {hours} H
      </span>
      <span className="flex gap-2 text-sm font-semibold 2xl:text-md">
        <img src={studentsIcon} className="w-[1em] h-[1em] my-auto" alt="" />
        {students} Alunos
      </span>
    </div>
  );
}
