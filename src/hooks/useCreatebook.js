"use client"

import { createBook } from "@/services/book.service"
import { useState, useEffect } from "react"

const [formdata, setformdata] = useState("")
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


useEffect()

const createsinglebook = async (req, res) => {

    try {
        const newbook = await createBook(req.body)

        res.status(201).json({
            sucsses: true,
            message: "book created succssesfully",
            data: newbook
        })
    } catch (err) {



    }
}
