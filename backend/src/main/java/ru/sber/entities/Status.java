package ru.sber.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Статус у задачи
 */
@Entity
@Data
@NoArgsConstructor
@Table(name = "Statuses")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EStatus name;
}
