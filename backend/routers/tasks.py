from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
from models import Task
from schemas import TaskCreate, TaskUpdate, TaskResponse

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=list[TaskResponse])
def get_tasks(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query("all"),
    db: Session = Depends(get_db)
):
    query = db.query(Task)

    if search:
        query = query.filter(Task.title.ilike(f"%{search}%"))

    if status == "active":
        query = query.filter(Task.is_completed == False)
    elif status == "inactive":
        query = query.filter(Task.is_completed == True)

    return query.order_by(Task.created_at.desc()).all()

@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(**task.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    existing = db.query(Task).filter(Task.id == task_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")
    existing.title = task.title
    existing.description = task.description
    db.commit()
    db.refresh(existing)
    return existing

@router.patch("/{task_id}/toggle", response_model=TaskResponse)
def toggle_task(task_id: int, db: Session = Depends(get_db)):
    existing = db.query(Task).filter(Task.id == task_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")
    existing.is_completed = not existing.is_completed
    db.commit()
    db.refresh(existing)
    return existing

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    existing = db.query(Task).filter(Task.id == task_id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(existing)
    db.commit()