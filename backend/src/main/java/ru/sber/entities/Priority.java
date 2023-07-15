package ru.sber.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Определения приоритета у задач
 */
@Entity
@Data
@NoArgsConstructor
@Table(name = "priorities")
public class Priority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EPriority name;
}
