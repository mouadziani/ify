package com.erepnikov.model.response;

/**
 * Class OperationResponse
 *
 * @author Egor Repnikov
 * @since 21.02.2018
 */
public class OperationResponse {

    public enum ResponseStatusEnum {
        SUCCESS,
        ERROR,
        WARNING,
        NO_ACCESS
    }

    private ResponseStatusEnum  operationStatus;

    private String  operationMessage;

    public ResponseStatusEnum getOperationStatus() {
        return operationStatus;
    }

    public void setOperationStatus(ResponseStatusEnum operationStatus) {
        this.operationStatus = operationStatus;
    }

    public String getOperationMessage() {
        return operationMessage;
    }

    public void setOperationMessage(String operationMessage) {
        this.operationMessage = operationMessage;
    }
}
