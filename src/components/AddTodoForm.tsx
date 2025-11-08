import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { Textarea } from "./ui/textarea"

interface AddTodoModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAdd: (title: string, description: string) => void
    loading?: boolean
}

export function AddTodoModal({ open, loading, onOpenChange, onAdd }: AddTodoModalProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.trim()) {
            onAdd(title.trim(), description.trim())
            setTitle("")
            setDescription("")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                    <Textarea
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!title.trim() || !description.trim() || loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Task"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
