
import java.util.*;

class User {
    private int userId;
    private String name;
    private String email;

    public User(int userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public int getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }

    public void displayInfo() {
        System.out.println("User ID: " + userId + ", Name: " + name + ", Email: " + email);
    }
}

class Loan {
    private int loanId;
    private int userId;
    private String type;
    private double amount;

    public Loan(int loanId, int userId, String type, double amount) {
        this.loanId = loanId;
        this.userId = userId;
        this.type = type;
        this.amount = amount;
    }

    public void displayLoan() {
        System.out.println("Loan ID: " + loanId + ", Type: " + type + ", Amount: " + amount + ", User ID: " + userId);
    }
}

class Transaction {
    private int transactionId;
    private int userId;
    private String type; // deposit or withdrawal
    private double amount;

    public Transaction(int transactionId, int userId, String type, double amount) {
        this.transactionId = transactionId;
        this.userId = userId;
        this.type = type;
        this.amount = amount;
    }

    public void displayTransaction() {
        System.out.println("Transaction ID: " + transactionId + ", Type: " + type + ", Amount: " + amount + ", User ID: " + userId);
    }
}

class Branch {
    private int branchId;
    private String name;
    private List<User> users;

    public Branch(int branchId, String name) {
        this.branchId = branchId;
        this.name = name;
        this.users = new ArrayList<>();
    }

    public void addUser(User user) {
        users.add(user);
        System.out.println("User " + user.getName() + " added to branch " + name);
    }

    public void displayBranch() {
        System.out.println("Branch ID: " + branchId + ", Name: " + name);
        System.out.println("Users:");
        for (User user : users) {
            user.displayInfo();
        }
    }
}

public class VirtualBankManagement {
    public static void main(String[] args) {
        User user1 = new User(1, "Alice", "alice@email.com");
        User user2 = new User(2, "Bob", "bob@email.com");

        Branch branch1 = new Branch(101, "Downtown Branch");
        branch1.addUser(user1);
        branch1.addUser(user2);

        Loan loan1 = new Loan(201, 1, "Home", 500000);
        Loan loan2 = new Loan(202, 2, "Car", 250000);

        Transaction t1 = new Transaction(301, 1, "Deposit", 10000);
        Transaction t2 = new Transaction(302, 2, "Withdrawal", 5000);

        // Display details
        System.out.println("\n--- Branch Info ---");
        branch1.displayBranch();

        System.out.println("\n--- Loan Info ---");
        loan1.displayLoan();
        loan2.displayLoan();

        System.out.println("\n--- Transactions ---");
        t1.displayTransaction();
        t2.displayTransaction();
    }
}