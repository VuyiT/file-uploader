/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `file` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `folder` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "file_name_userId_key" ON "file"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "folder_name_userId_key" ON "folder"("name", "userId");
