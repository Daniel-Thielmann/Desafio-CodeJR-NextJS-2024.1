"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";

export async function fetchAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      categories: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const count = await prisma.product.count();

  return { products, count };
}

export async function fetchProductById(id: number | undefined) {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      categories: true,
      price: true,
    },
  });

  return product;
}

export async function deleteProduct(id: number | undefined) {
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin/manage/allproducts");
}

type Category = {
  id: number;
  name: string;
};

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categories = formData.getAll("categories") as string[];
  const price = parseFloat(formData.get("price") as string);
  const imageFile = formData.get("image") as File;
  const imageUrl = await uploadImage(imageFile);

  const categoryRecords: (Category | null)[] = await Promise.all(
    categories.map(async (categoryName) => {
      const category = await prisma.category.findUnique({
        where: { name: categoryName },
      });
      return category;
    })
  );

  const validCategories = categoryRecords.filter(
    (category): category is Category => category !== null
  );

  await prisma.product.create({
    data: {
      title,
      content,
      image: imageUrl,
      price,
      published: true,
      categories: {
        connect: validCategories.map((category) => ({ id: category.id })),
      },
    },
  });

  redirect("/admin/manage/allproducts");
}

export async function updateProduct(
  id: number | undefined,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const price = parseFloat(formData.get("price") as string);
  const categoryNames = formData.getAll("categories") as string[];
  const imageFile = formData.get("image") as File;
  const imageUrl = await uploadImage(imageFile);

  const categoryRecords: (Category | null)[] = await Promise.all(
    categoryNames.map(async (categoryName) => {
      const category = await prisma.category.findUnique({
        where: { name: categoryName },
      });
      return category;
    })
  );

  const validCategories = categoryRecords.filter(
    (category): category is Category => category !== null
  );

  await prisma.product.update({
    where: { id: id },
    data: {
      title,
      content,
      image: imageUrl,
      price,
      categories: {
        set: validCategories.map((category) => ({ id: category.id })),
      },
    },
  });

  redirect("/admin/manage/allproducts");
}

async function uploadImage(file: File): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "products");
  const uploadPath = path.join(uploadDir, file.name);

  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(uploadPath, buffer);

    const relativeUrl = path.join("/products", file.name).replace(/\\/g, "/");
    return relativeUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
}

export async function fetchAllCategories() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return categories;
}
