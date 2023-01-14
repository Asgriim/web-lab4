package org.asgrim.lab4.data;

import lombok.Data;
import lombok.NonNull;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
public class EntryDTO {
    @Min(-4)
    @Max(4)
    @NonNull
    private double x;

    @Min(-5)
    @Max(5)
    @NonNull
    private double y;

    @Min(1)
    @Max(4)
    @NonNull
    private double r;
}