'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fromJSON } from "postcss";
import { Prisma } from "@prisma/client";
import { POST } from "../api/login/route";

export default function name() {
    const route = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async(e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {"Content-Type": "application-json"},
            body: JSON.stringify(formData)
        });

        const data = await res.json();
        if(res.ok){
            console.log("register Conpet");
            
        }
    }

    return (
        <form onSubmit={handleRegister} >
            <h2 className = 'text-3xl'>📝 สมัครสมาชิก</h2>
            <input className= 'text-black' type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input className= 'text-black' type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input className= 'text-black' type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">สมัครสมาชิก</button>
        </form>
    )
}