package ru.sber.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Задача
 */
@Entity
@Data
@Table(name = "Tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    @Size(max = 20)
    private String title;

    @Column(nullable = false)
    @Size(max = 20)
    private String description;

    @Column(name = "deadline")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "category_Id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "status_Id", nullable = false)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "priority_Id", nullable = false)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "regularity_Id", nullable = false)
    private Regularity regularity;
}
