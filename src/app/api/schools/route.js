import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import pool from "@/lib/connectDb";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        // Pagination
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const offset = (page - 1) * limit;

        // Filters
        const state = searchParams.get("state");
        const name = searchParams.get("name");

        // Build WHERE clause dynamically
        let whereClauses = [];
        let params = [];

        if (state) {
            whereClauses.push("LOWER(state) = LOWER(?)");
            params.push(state);
        }
        if (name) {
            whereClauses.push("LOWER(name) LIKE LOWER(?)");
            params.push(`%${name}%`);
        }

        const whereSQL = whereClauses.length > 0 ? "WHERE " + whereClauses.join(" AND ") : "";

        // Count total for pagination
        const countQuery = `SELECT COUNT(*) as total FROM schools ${whereSQL}`;
        const [countRows] = await pool.execute(countQuery, params);
        const total = countRows[0].total;

        // Fetch data with pagination — inject limit/offset directly as numbers
        const dataQuery = `SELECT * FROM schools ${whereSQL} LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;
        const [rows] = await pool.execute(dataQuery, params);

        return NextResponse.json({
            success: true,
            data: rows,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}



export async function POST(req) {
    try {

        const formData = await req.formData();

        const name = formData.get("name");
        const address = formData.get("address");
        const city = formData.get("city");
        const state = formData.get("state");
        const contact = formData.get("contact");
        const email_id = formData.get("email_id");
        const file = formData.get("image");

        if (!name || !address || !city || !state || !contact || !email_id || !file) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        // Convert File → Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload via stream
        const uploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "schoolImages" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });

        const uploadRes = await uploadPromise;

        // Now save school data + image URL to DB
        const imageUrl = uploadRes.secure_url;

        const [result] = await pool.execute(
            `INSERT INTO schools (name, address, city, state, contact, email_id, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, address, city, state, contact, email_id, imageUrl]
        );

        return NextResponse.json({ success: true, message: "School Added successfully!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}