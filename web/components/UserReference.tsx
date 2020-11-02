import { FC } from "react";
import Link from "next/link";
import { UserInfoFragment } from "../graphql-codegen";

export const UserReference: FC<{
  user: UserInfoFragment | null | undefined;
  link?: boolean;
}> = ({ user, link = false }) => {
  if (!user) {
    return (
      <span>
        anonymous
        <style jsx>{`
          span {
            font-style: italic;
          }
        `}</style>
      </span>
    );
  }
  if (!user.name || !user.image)
    throw new Error("Expected name & image properties");
  const base = (
    <span>
      <img alt={user.name} src={user.image} /> <span>{user.name}</span>
      <style jsx>{`
        img {
          vertical-align: middle;
          height: 2em;
          border-radius: 2em;
          margin: 0.2em 0;
        }
        span > span {
          text-decoration: ${link ? "underline" : "none"};
        }
      `}</style>
    </span>
  );
  if (!link) {
    return base;
  }
  return (
    <span>
      <Link href={`/user/${user.id}`}>
        <a>{base}</a>
      </Link>
      <style jsx>{`
        a {
          text-decoration: none;
        }
      `}</style>
    </span>
  );
};
