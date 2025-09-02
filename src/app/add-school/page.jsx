"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

// ✅ Zod schema with best practices
const formSchema = z.object({
    name: z.string().min(1, "School name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    contact: z
        .string()
        .regex(/^\d{10}$/, "Contact must be exactly 10 digits"),
    email_id: z.string().email("Invalid email address"),
    image: z
        .custom(
            (files) => files instanceof FileList && files.length > 0,
            "Image is required"
        )
        .refine(
            (files) => files?.[0]?.type.startsWith("image/"),
            "File must be an image"
        )
        .refine(
            (files) => files?.[0]?.size <= 2 * 1024 * 1024,
            "Image must be under 2MB"
        ),
});

async function addSchoolApi(formData) {
    const res = await fetch("/api/schools", {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Failed to add school");
    return res.json();
}

export default function AddSchool() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur", // ✅ errors show on blur
        defaultValues: {
            name: "",
            address: "",
            city: "",
            state: "",
            contact: "",
            email_id: "",
            image: null,
        },
    });

    const mutation = useMutation({
        mutationFn: addSchoolApi,
        onSuccess: () => {
            toast.success("School added successfully!"); 
            form.reset();
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        },
    });

    async function onSubmit(values) {

        const formData = new FormData();
        for (let key in values) {
            if (key === "image") {
                formData.append("image", values.image[0]);
            } else {
                formData.append(key, values[key]);
            }
        }
        mutation.mutate(formData);
    }

    return (
        <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow-xl rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Add School
            </h2>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-5 sm:grid-cols-2"
                >
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>School Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Green Valley School" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Address */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* City */}
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Mumbai" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* State */}
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Maharashtra" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Contact */}
                    <FormField
                        control={form.control}
                        name="contact"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact</FormLabel>
                                <FormControl>
                                    <Input placeholder="10-digit number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="school@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image Upload */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>School Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            field.onChange(e.target.files);
                                            if (e.target.files[0]) {
                                                setPreview(URL.createObjectURL(e.target.files[0]));
                                            } else {
                                                setPreview(null);
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image Preview */}
                    {preview && (
                        <div className="col-span-2 flex justify-center">
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 w-40 h-40 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <div className="col-span-2">
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Adding..." : "Add School"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
