-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AUTHOR');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "username" TEXT,
    "author_name" TEXT NOT NULL,
    "author_email" TEXT NOT NULL,
    "author_pfp" TEXT,
    "role" "Role" NOT NULL DEFAULT 'AUTHOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Article" (
    "article_id" TEXT NOT NULL,
    "article_title" TEXT NOT NULL,
    "article_content" TEXT NOT NULL,
    "article_time" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tag_id" TEXT NOT NULL,
    "tag_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_author_email_key" ON "User"("author_email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tag_name_key" ON "Tag"("tag_name");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;
