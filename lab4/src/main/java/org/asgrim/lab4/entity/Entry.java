package org.asgrim.lab4.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.asgrim.lab4.data.ShotDTO;

import javax.persistence.*;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "asgrim_entry")
public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double x;
    private double y;
    private double r;
    private boolean result;
    // TODO: 14.01.2023 может всё сломать
    private Instant tm;
    private double scriptTime;
//    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name = "userid")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    public Entry(ShotDTO shotDTO, User user) {
        this.x = shotDTO.getX();
        this.y = shotDTO.getY();
        this.r = shotDTO.getR();
        this.result = shotDTO.isResult();
        this.tm = Instant.now(Clock.systemUTC());
//        this.time = shotDTO.getTime();
        this.user = user;
    }
}