import { Link } from "react-router-dom";
import type  { User } from "../types";

interface Props {
  user: User;
}

function UserCard({ user }: Props) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
      <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400" />
      <h3 className="text-xl font-semibold text-gray-700">{user.name}</h3>
      <Link to={`/user/${user.id}`}>
        <button className="mt-2 px-3 py-1 bg-reactblue hover:bg-[#4ecde9] text-white text-sm rounded-full">
  View Profile
</button>

      </Link>
    </div>
  );
}

export default UserCard;
