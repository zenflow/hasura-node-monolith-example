ALTER TABLE "public"."posts" ADD COLUMN "is_hidden" bool;
ALTER TABLE "public"."posts" ALTER COLUMN "is_hidden" DROP NOT NULL;
ALTER TABLE "public"."posts" ALTER COLUMN "is_hidden" SET DEFAULT false;
