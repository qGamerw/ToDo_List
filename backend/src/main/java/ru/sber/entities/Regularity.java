package ru.sber.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Определение повторяемых задач
 */
@Entity
@Data
@NoArgsConstructor
@Table(name = "regularities")
public class Regularity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERegularity name;
}
