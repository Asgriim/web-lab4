package org.asgrim.lab4.service;

import lombok.NoArgsConstructor;
import org.asgrim.lab4.data.EntryDTO;
import org.asgrim.lab4.data.ShotDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@NoArgsConstructor
public class ShotService {

    public ShotDTO checkShot(EntryDTO entry){
        ShotDTO ans = new ShotDTO(entry);
        ans.setTime(LocalDateTime.now());
        ans.setResult(entry.getR() != 0 && isHit(entry.getX(), entry.getY(), entry.getR()));
        return ans;
    }

    private boolean isHit(double x, double y, double r){
        if(x < 0 && y > 0)
            return false;

        if(x >= 0 && y >= 0)
            return y <= -x*2 + r;
//            return x <= 1 && y <= 0.5;

        if(x > 0 && y < 0)
            return x < r && y > -r;
//            return y <= x - 1;

        if(x < 0 && y < 0)
            return x*x + y*y <= r;
        return false;
    }

}